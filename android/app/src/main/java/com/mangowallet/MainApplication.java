package com.mangowallet;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.airbnb.android.react.lottie.LottiePackage;
import com.janeasystems.rn_nodejs_mobile.RNNodeJsMobilePackage;
import ui.toasty.RNToastyPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.react.rnspinkit.RNSpinkitPackage;
import cl.json.RNSharePackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.oblador.keychain.KeychainPackage;
import com.horcrux.svg.SvgPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.imagepicker.ImagePickerPackage;

import javax.net.ssl.*;
import java.security.SecureRandom;
import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.react.modules.network.ReactCookieJarContainer;
import java.util.concurrent.TimeUnit;
import okhttp3.CertificatePinner;
import okhttp3.OkHttpClient;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;


import java.util.Arrays;
import java.util.List;

class CustomClientFactory implements OkHttpClientFactory {
  private static String hostname = "mango-wallet.com";
  @Override
  public OkHttpClient createNewNetworkModuleClient() {
    try {
      final TrustManager[] trustAllCerts = new TrustManager[] {
        new X509TrustManager() {
          @Override
          public void checkClientTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {
          }

          @Override
          public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {
          }

          @Override
          public java.security.cert.X509Certificate[] getAcceptedIssuers() {
            return new java.security.cert.X509Certificate[]{};
          }
        }
      };

      // Install the all-trusting trust manager
      final SSLContext sslContext = SSLContext.getInstance("SSL");
      sslContext.init(null, trustAllCerts, new java.security.SecureRandom());
      // Create an ssl socket factory with our all-trusting manager
      final SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();

      OkHttpClient.Builder builder = new OkHttpClient.Builder();
      builder.sslSocketFactory(sslSocketFactory, (X509TrustManager)trustAllCerts[0]);
      builder.hostnameVerifier(new HostnameVerifier() {
        @Override
        public boolean verify(String hostname, SSLSession session) {
          return true;
        }
      });

      OkHttpClient okHttpClient = builder
        .connectTimeout(15, TimeUnit.SECONDS)
        .writeTimeout(15, TimeUnit.SECONDS)
        .readTimeout(15, TimeUnit.SECONDS)
        .cookieJar(new ReactCookieJarContainer())
        .build();
      return okHttpClient;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
}

public class MainApplication extends Application implements ReactApplication {
  
  public MainApplication() {
    OkHttpClientProvider.setOkHttpClientFactory(new CustomClientFactory());
  }

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new LottiePackage(),
        new RNToastyPackage(),
        new SplashScreenReactPackage(),
        new RNSpinkitPackage(),
        new RNDeviceInfo(),
        new FBSDKPackage(mCallbackManager),
        new RNNodeJsMobilePackage(),
        new RNSharePackage(),
        new RandomBytesPackage(),
        new KeychainPackage(),
        new SvgPackage(),
        new FingerprintAuthPackage(),
        new LinearGradientPackage(),
        new RNI18nPackage(),
        new VectorIconsPackage(),
        new ReactNativeRestartPackage(),
        new ImagePickerPackage()
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
    AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
