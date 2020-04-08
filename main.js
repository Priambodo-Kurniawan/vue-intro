var app = new Vue({
  el: '#app',
  data: {
    productName: 'Masker Kain',
    productBrand: 'Hacktiv8',
    image: 'image/masker-abu.jpg',
    stock: 8,
    descriptions: [
      'Masker penunjang kesehatan',
      'Ringan & nyaman digunakan',
      'Tidak buat sesak nafas dan efektif menghalangi debu serta dapat di cuci',
      'Cocok untuk penggunaan diluar ruangan ataupun di dalam ruangan',
      'Material : Kain katu'
    ],
    variants: [
      {
        id: 1,
        color: 'gray',
        image: 'image/masker-abu.jpg',
        stock: 0
      },
      {
        id: 2,
        color: 'purple',
        image: 'image/masker-ungu.jpg',
        stock: 20
      }
    ],
    cart: 0,
    isCheckoutPage: false,
    isLogin: false,
    user: {
      username: '',
      password: ''
    },
    products: [],
    category: ''
  },
  computed: {
    productFullName() {
      // let name = this.productBrand.split('').reverse().join('')
      let name = this.productBrand
      return this.productName + ' ' + name
    }
  },
  methods: {
    selectVariant: function(variant) {
      this.image = variant.image
      this.stock = variant.stock
    },
    addToCart: function() {
      this.cart += 1
    },
    checkout() {
      this.isCheckoutPage = true
    },
    login() {
      let payload = {
        username: this.user.username,
        password: this.user.password
      }
      
      // hit api
      // set token

      localStorage.setItem('token', 'jshfjashfjhsdf')
      this.user.username = ''
      this.user.password = ''
      this.isLogin = true
      this.getProducts()
    },
    getProducts() {
      let filter = ''
      if (this.category) {
        filter = `category=${this.category}`
      }

      axios.get(`http://localhost:3000/products?${filter}`)
        .then(result => {
          this.products = result.data
        })
    },
    logout () {
      localStorage.clear()
      this.isLogin = false
    }
  },
  watch: {
    category () {
      this.getProducts()
    }
  },
  // vue lifecycle
  beforeCreate() {
    console.log('beforeCreate')
    console.log('beforeCreate >>>>>>', this.productName)
  },
  created() {
    if (localStorage.token) {
      this.isLogin = true
      this.getProducts()
    }

  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  // beforeUpdate() {
  //   console.log('beforeUpdate')
  // },
  // updated() {
  //   console.log('updated')
  // },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  destroy() {
    console.log('destroy')
  }
})