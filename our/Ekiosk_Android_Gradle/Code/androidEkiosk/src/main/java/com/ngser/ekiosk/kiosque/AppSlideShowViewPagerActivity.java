package com.ngser.ekiosk.kiosque;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.v4.view.ViewPager;
import android.view.MenuItem;

import com.actionbarsherlock.view.Menu;
import com.ngser.ekiosk.MainActivity;
import com.ngser.ekiosk.R;
import com.viewpagerindicator.CirclePageIndicator;
import com.viewpagerindicator.PageIndicator;

/**
 * Created by ITD on 01/01/16.
 */
public class AppSlideShowViewPagerActivity extends Activity {
    private final String IS_FIRST_LAUNCH = "com.ekiosk.is.first.launch";
    private ViewPager mViewPager;
    private AppSlideShowViewPagerAdapter adapter;
    private PageIndicator indicator;

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
        setContentView(R.layout.activity_app_slides_vp);

        mViewPager = (ViewPager) findViewById(R.id.pager);
        indicator = (CirclePageIndicator) findViewById(R.id.page_indicator);


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
                            saveIsFirstLaunchInPreferences(AppSlideShowViewPagerActivity.this, false);
                            startActivity(new Intent(AppSlideShowViewPagerActivity.this, MainActivity.class));
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
        adapter = new AppSlideShowViewPagerAdapter(this);
        mViewPager.setAdapter(adapter);
        mViewPager.setOffscreenPageLimit(4);
        indicator.setViewPager(mViewPager);

    }

    @Override
    public boolean onCreateOptionsMenu(android.view.Menu menu) {
        getMenuInflater().inflate(R.menu.menu_done, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.menu_done) {
            if (getIntent().hasExtra("isFromMenu")) {
                finish();
            } else {
                startActivity(new Intent(AppSlideShowViewPagerActivity.this, MainActivity.class));
                finish();
            }
        }


        return super.onOptionsItemSelected(item);
    }
}
