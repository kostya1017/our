package com.ngser.ekiosk.menu;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;

import com.ngser.ekiosk.AsyncTask.JSONParser;
import com.ngser.ekiosk.R;

import org.apache.http.message.BasicNameValuePair;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class ForgotPasswordActivity extends Activity {

    private EditText emailEt;
    private ProgressBar confirmProgressBar;
    private Button confirmButton;
    private ForgotPasswordTask sendCodeTask;

    private Context mContext;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mContext = this;
        setContentView(R.layout.forgot_password_activity);

        getActionBar().setDisplayHomeAsUpEnabled(true);
        getActionBar().setHomeButtonEnabled(true);

        emailEt = (EditText) findViewById(R.id.emailEditText);

        confirmProgressBar = (ProgressBar) findViewById(R.id.confirmProgressBar);

        confirmButton = (Button) findViewById(R.id.confirmButton);

        confirmButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sendFunction();
            }
        });

    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        int id = item.getItemId();
        if (id == android.R.id.home) {

            this.finish();

            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public void sendFunction() {
        emailEt.setBackgroundResource(R.drawable.edittext_border_no_error);

        if (emailEt.getText().toString().equals("") || !isValidEmail(emailEt.getText().toString())) {
            emailEt.setBackgroundResource(R.drawable.edittext_border_error);
        } else {
            confirmProgressBar.setVisibility(View.VISIBLE);
            confirmButton.setEnabled(false);
            confirmButton.setAlpha(0.5f);
            sendCodeTask = new ForgotPasswordTask();
            sendCodeTask.execute();
        }

    }

    public void connectionFailedFunction(String failedError) {

        confirmProgressBar.setVisibility(View.GONE);
        confirmButton.setEnabled(true);
        confirmButton.setAlpha(1);

        AlertDialog.Builder bld = new AlertDialog.Builder(this);
        bld.setMessage(failedError);
        bld.setNeutralButton("Retour", null);
        bld.create().show();
    }

    private class ForgotPasswordTask extends AsyncTask<String, String, JSONObject> {

        String emailString = null;


        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            emailString = emailEt.getText().toString();

        }

        @Override
        protected JSONObject doInBackground(String... args) {
            JSONParser jParser = new JSONParser();
            // Getting JSON from URL
            if (isCancelled()) {
                return null;
            }

            StringBuilder strBuilder = new StringBuilder("http://api.ngser.gnetix.com/v1.1/resetPasswordMail.php?");
            strBuilder.append("username=");
            strBuilder.append(emailString);
            String url = strBuilder.toString();

            JSONObject json = jParser.getJSONFromUrl(url);

            if (isCancelled()) {
                return null;
            }

            return json;
        }

        @Override
        protected void onPostExecute(JSONObject json) {

            if (json == null)
                return;

            try {
                String resultat = json.getString("resultat");
                Log.d("resultat", resultat);

                if (!resultat.equals("true")) {
                    connectionFailedFunction("Error");

                    return;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

            AlertDialog.Builder bld = new AlertDialog.Builder(mContext);
            bld.setTitle("Informations");
            bld.setMessage("Le lien pour réinitialiser votre mot de passe a été envoyé à votre adresse email.");
            bld.setNeutralButton("OK", new DialogInterface.OnClickListener() {
                public void onClick(DialogInterface dialog, int which) {
                    finish();
                    overridePendingTransition(0, 0);
                }
            });
            bld.create().show();

            if (isCancelled()) {
                return;
            }
        }
    }


    /**
     * Method will check either given email is valid or not
     *
     * @param target
     * @return
     */
    private boolean isValidEmail(CharSequence target) {
        return !TextUtils.isEmpty(target) && android.util.Patterns.EMAIL_ADDRESS.matcher(target).matches();
    }

}
