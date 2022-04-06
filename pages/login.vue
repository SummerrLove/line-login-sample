<template>
    <v-row justify="center">
        <v-col cols="1" md="4" sm="4" lg="4" xl="4"/>
        <v-col class="mt-6" >
            <v-row justify="center" class="ma-5">
                <h3>使用帳號密碼登入</h3>
            </v-row>

            <v-row>
                <v-text-field label="username" outlined width="300">
                </v-text-field>             
            </v-row>
            <v-row>
                <v-text-field label="password" outlined>
                </v-text-field>
            </v-row>
            <v-row justify="center">
                <v-btn @click="user_login">Log in</v-btn>
            </v-row>

            <v-row justify="center" class="ma-5">
                <h3>Line-Login Test</h3>
            </v-row>
            
            <v-row justify="center" class="ma-5">
                <v-btn width="151" height="44"  @click="line_login">
                    <v-img src="/btn_login_base.png" width="151" height="44">
                    </v-img>
                </v-btn>
            </v-row>
        </v-col>
        <v-col cols="1" md="4" sm="4" lg="4" xl="4"/>
    </v-row>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            username: null,
            password: null,


            channel_id: '1656870322',
            channel_secret: null,
            // redirect_url: 'https://node-tester-sv20220215.herokuapp.com/authenticated',
            redirect_url: 'http://localhost:3000/auth',
            state: 'xyz1234',
            scope: 'profile%20openid%20email',
            
        }
        
    },

    methods:{

        async user_login(){
        
        },

        async line_login(){

            // get redirect url and channel id for line-login
            
            // generate a random string as 'state'

            // axios.get("http://node-tester-sv20220215.herokuapp.com/");


            let url = "https://access.line.me/oauth2/v2.1/authorize?response_type=code"
                + "&client_id=" + this.channel_id
                + "&redirect_uri=" + this.redirect_url
                + "&state=" + this.state
                + "&scope=" + this.scope;

            window.location.replace(url);

            // let params = new URLSearchParams(
            //     {
            //         code: "sample code",
            //         state: "my state",
            //         callback_url: "http://localhost:3000/auth"
            //     }
            // );

            // console.log(params.toString());
            
            // let url = "http://node-tester-sv20220215.herokuapp.com/line-verify";
            // url = "http://localhost:3064/line-verify";

            // await axios.post(url, params)
            // .then( res => {
            //     this.$router.push('/');
            //     console.log(res.data);
            // })
            // .catch( err => {
            //     console.log(err);
            // })
        },

    },

    computed:{
        
    },

    mounted: function(){
        // get the parameters of current url
        // console.log(this.$route.query);
    }
}
</script>

<style scoped>

/* .v-text-field{
    width: 400px;
} */

</style>