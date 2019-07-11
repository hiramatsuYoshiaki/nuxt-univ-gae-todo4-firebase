export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      // { name: "google-site-verification",
      //   content: "TaWpD9i4R5GSPzJjnTc8--t-g8bbDKbfxQX-xxxxxxx" },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      { rel: 'icon', type: 'image/x-icon', href: '/h-logo-white.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
    
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/sass/styles.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    // ['@nuxtjs/google-analytics', { id: 'UA-35511262-5' }],
    // '@nuxtjs/sitemap',
    '@nuxtjs/markdownit',
  ],
  styleResources: {
    sass: [
      '~/assets/sass/variable.scss',
    ],
  },
  //devModules: ['@nuxtjs/eslint-module'],
  // sitemap: {
  //   hostname: 'https://romantic-kare-6d357c.netlify.com/',
  //   generate: true,
  //   routes:[
  //     "/",
  //     {
  //       url: '/works',
  //       changefreq: 'daily',
  //       priority: 1,
  //       lastmodISO: '2017-06-30T13:30:00.000Z'
  //     },
  //     "/about",
  //     "/contact"
  //   ]
  // },
  markdownit: {
    preset: 'default',
    injected: true, 
    breaks: true, 
    html: true, 
    linkify: true,
    typography: true, 
    xhtmlOut: true,
    langPrefix: 'language-',
    quotes: '“”‘’',
    highlight: function (/*str, lang*/) { return ''; },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {}
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options : {
            fix : true
          }
        })
      }
    },
    //autoprefixer
    // build: {
    //   postcss: [
    //     require('autoprefixer')({
    //       grid: true
    //     })
    //   ]
    // }
  }
}
