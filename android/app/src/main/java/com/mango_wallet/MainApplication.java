package com.mango_wallet;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.keychain.KeychainPackage;
import com.horcrux.svg.SvgPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.avishayil.rnrestart.ReactNativeRestartPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new KeychainPackage(),
            new SvgPackage(),
            new FingerprintAuthPackage(),
            new BlurViewPackage(),
            new LinearGradientPackage(),
            new RNI18nPackage(),
            new VectorIconsPackage(),
             new ReactNativeRestartPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
