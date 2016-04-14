package com.ngser.ekiosk.kiosque;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.preference.PreferenceManager;

import com.artifex.mupdflib.MuPDFActivity;
import com.ngser.ekiosk.MainActivity;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by ITD on 29/12/15.
 */
public class AppSlideShowActivity extends Activity {

    private final String IS_FIRST_LAUNCH = "com.ekiosk.is.first.launch";
    private static final String SLIDES_FILE_NAME = "ekiosk_android_tutoriel.pdf";
    BroadcastReceiver receiver;

    /**
     * Method will get IS FIRST LAUNCH from Shared Preferences
     *
     * @param context
     * @return
     */
    private boolean isFirstLaunchFromPreferences(Context context) {
        return PreferenceManager.getDefaultSharedPreferences(context).getBoolean(IS_FIRST_LAUNCH, true);
    }


    /**
     * Method will save IS FIRST LAUNCH in Shared Preferences
     *
     * @param context
     * @param isFirstLaunch
     * @return
     */
    private boolean saveIsFirstLaunchInPreferences(Context context, boolean isFirstLaunch) {
        return PreferenceManager.getDefaultSharedPreferences(context).edit().putBoolean(IS_FIRST_LAUNCH, isFirstLaunch).commit();
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        File fo = getFilesDirectory(getApplicationContext());
        File fi = new File(fo, SLIDES_FILE_NAME);


        if (!fi.exists()) {
            copyTestDocToSdCard(fi);
        }


        receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String action = intent.getAction();
                if (MuPDFActivity.ACTION_DONE.equals(action)) {
                    startActivity(new Intent(AppSlideShowActivity.this, MainActivity.class));
                    finish();
                } else if (MuPDFActivity.ACTION_FINISH.equals(action)) {
                    finish();
                }
            }
        };
        registerReceiver(receiver, new IntentFilter(MuPDFActivity.ACTION_DONE));
        registerReceiver(receiver, new IntentFilter(MuPDFActivity.ACTION_FINISH));


        if (!getIntent().hasExtra("isFromMenu") && !isFirstLaunchFromPreferences(this)) {
            startActivity(new Intent(this, MainActivity.class));
            finish();
        } else if (!getIntent().hasExtra("isFromMenu") && isFirstLaunchFromPreferences(this)) {
            DialogInterface.OnClickListener dialogClickListener = new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    switch (which) {
                        case DialogInterface.BUTTON_POSITIVE:
                            launchSlides();
                            break;

                        case DialogInterface.BUTTON_NEGATIVE:
                            saveIsFirstLaunchInPreferences(AppSlideShowActivity.this, false);
                            startActivity(new Intent(AppSlideShowActivity.this, MainActivity.class));
                            finish();
                            break;
                    }
                }
            };

            AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.setCancelable(false);
            builder.setMessage("Bienvenue sur ekiosk mobile!\n" +
                    "Prenez 1 minute pour visualiser le tutoriel").setPositiveButton("Accéder", dialogClickListener)
                    .setNegativeButton("Passer", dialogClickListener).show();
        } else {
            launchSlides();
        }
    }

    private void launchSlides() {
        saveIsFirstLaunchInPreferences(this, false);
        //Uri uri = Uri.parse("file:///android_asset/" + SLIDES_FILE_NAME);
        File fo = getFilesDirectory(getApplicationContext());
        File fi = new File(fo, SLIDES_FILE_NAME);
        Uri uri = Uri.parse(fi.getAbsolutePath());
        Intent intent = new Intent(this, com.artifex.mupdflib.MuPDFActivity.class);
        intent.setAction(Intent.ACTION_VIEW);
        intent.setData(uri);

        //if document protected with password
        intent.putExtra("password", "encrypted PDF password");

        //if you need highlight link boxes
        intent.putExtra("linkhighlight", true);

        //if you don't need device sleep on reading document
        intent.putExtra("idleenabled", false);

        //set true value for horizontal page scrolling, false value for vertical page scrolling
        intent.putExtra("horizontalscrolling", true);

        //set false if you don't want to see bottom previous list
        intent.putExtra("needBottomPreview", false);

        intent.putExtra("isFromMenu", getIntent().getBooleanExtra("isFromMenu", false));

        //document name
        intent.putExtra("docname", SLIDES_FILE_NAME);

        startActivity(intent);

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (receiver != null)
            unregisterReceiver(receiver);
    }


    private void copyTestDocToSdCard(final File testImageOnSdCard) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    InputStream is = getAssets().open(SLIDES_FILE_NAME);
                    FileOutputStream fos = new FileOutputStream(testImageOnSdCard);
                    byte[] buffer = new byte[8192];
                    int read;
                    try {
                        while ((read = is.read(buffer)) != -1) {
                            fos.write(buffer, 0, read);
                        }
                    } finally {
                        fos.flush();
                        fos.close();
                        is.close();
                    }
                } catch (IOException e) {

                }
            }
        }).start();
    }

    public static File getFilesDirectory(Context context) {
        File appFilesDir = null;
        if (Environment.getExternalStorageState().equals(android.os.Environment.MEDIA_MOUNTED)) {
            appFilesDir = getExternalFilesDir(context);
        }
        if (appFilesDir == null) {
            appFilesDir = context.getFilesDir();
        }
        return appFilesDir;
    }

    private static File getExternalFilesDir(Context context) {
        File dataDir = new File(new File(Environment.getExternalStorageDirectory(), "Android"), "data");
        File appFilesDir = new File(new File(dataDir, context.getPackageName()), "files");
        if (!appFilesDir.exists()) {
            if (!appFilesDir.mkdirs()) {
                //L.w("Unable to create external cache directory");
                return null;
            }
            try {
                new File(appFilesDir, ".nomedia").createNewFile();
            } catch (IOException e) {
                //L.i("Can't create \".nomedia\" file in application external cache directory");
                return null;
            }
        }
        return appFilesDir;
    }
}
