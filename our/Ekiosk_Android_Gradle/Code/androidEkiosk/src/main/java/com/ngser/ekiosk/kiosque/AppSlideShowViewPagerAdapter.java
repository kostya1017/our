package com.ngser.ekiosk.kiosque;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RelativeLayout;

import com.ngser.ekiosk.R;


/**
 * Created by ITD on 13/05/2015.
 */
public class AppSlideShowViewPagerAdapter extends android.support.v4.view.PagerAdapter {

    Context mContext;
    LayoutInflater mLayoutInflater;
    int[] mResources = {
            R.drawable.ekiosk_android_tutoriel_etape1,
            R.drawable.ekiosk_android_tutoriel_etape2,
            R.drawable.ekiosk_android_tutoriel_etape3,
            R.drawable.ekiosk_android_tutoriel_etape4
    };


    public AppSlideShowViewPagerAdapter(Context context) {
        super();
        mContext = context;
        mLayoutInflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    }

    @Override
    public int getCount() {
        return mResources.length;
    }

    @Override
    public boolean isViewFromObject(View view, Object object) {
        return view == ((RelativeLayout) object);
    }

    @Override
    public Object instantiateItem(ViewGroup container, final int position) {
        View itemView = mLayoutInflater.inflate(R.layout.pager_item, container, false);
        ImageView imageView = (ImageView) itemView.findViewById(R.id.imageView);
        imageView.setImageResource(mResources[position]);
        container.addView(itemView);

        return itemView;
    }

    @Override
    public void destroyItem(ViewGroup container, int position, Object object) {
        container.removeView((RelativeLayout) object);
    }
}

