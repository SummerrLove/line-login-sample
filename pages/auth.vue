<template>
    <v-row justify="center">
        <v-col cols="1"/>
        <v-col class="mt-6" >
            <v-row justify="center" class="ma-5">
                <h3 v-if="loading">Logging In...</h3>
                <h3 v-else-if="show_error">{{error_message}}</h3>
                <h3 v-else>Greetings, {{name}}</h3>
            </v-row>

            <v-row justify="space-around" class="ma-4">
                <v-avatar size="172" class="grey-background">
                    <img :src="pic" @error="imageNotFound()">
                </v-avatar>
            </v-row>
            <v-row>
                <v-text-field v-model="code" label="code" outlined >
                </v-text-field>             
            </v-row>
            <v-row>
                <v-text-field v-model="state" label="state" outlined>
                </v-text-field>
            </v-row>

        </v-col>
        <v-col cols="1"/>
    </v-row>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            code: null,
            state: null,
            loading: true,
            name: null,
            pic: null,
            show_error: false,
            error_message: null,
        }
        
    },

    methods:{
        
        // login system with the token from line-login and state
        async login_with_line_token(){
            console.log("print parameters before login_with_line_token:");
            console.log(this.code);
            console.log(this.state);

            let params = new URLSearchParams(
                {
                    code: this.code,
                    state: this.state,
                    callback_url: "http://localhost:3000/auth"
                }
            );
            // params.append("code", this.code);
            // params.append("state", this.state);
            // params.append("callback_url", "http://localhost:3000/auth");

            console.log(params.toString());
            
            let url = "http://node-tester-sv20220215.herokuapp.com/line-verify";
            // url = "http://localhost:3066/line-verify";
            url = "http://localhost:6688/pc/user/line_login";

            let self = this;
            await axios.post(url, params)
            .then( res => {
                // this.$router.push('/');
                console.log(res.data);
                // self.name = res.data.data.name;
                // self.pic = res.data.data.picture;
                if (res.data.code == 200){
                    // user logged in
                    self.show_error = false;
                    self.name = res.data.data.userInfo.name;
                    self.pic = res.data.data.userInfo.picture;
                } else if (res.data.code == -100){
                    // account not exist
                    self.show_error = true;
                    self.error_message = res.data.message;
                } else if (res.data.code == -183){
                    // line login failed
                    self.show_error = true;
                    self.error_message = res.data.message;
                }
                
                self.loading = false;
            })
            .catch( err => {
                console.log(err);
            })
        },

        imageNotFound(){
            console.log("profile image not found!");
        }
    },

    computed:{
        
    },

    mounted: function(){
        // get the parameters of current url
        console.log(this.$route.query);
        this.loading = true;
        this.code = this.$route.query.code;
        this.state = this.$route.query.state;

        this.login_with_line_token();
    }
}
</script>

<style scoped>

/* .v-text-field{
    width: 400px;
} */

</style>