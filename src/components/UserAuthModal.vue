<template>
<!-- eslint-disable  -->
    <div class="fixed z-10 inset-0 overflow-y-auto" id="modal"
      :class="{ hidden: !authModalShow}">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center
    sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
        shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click.prevent="toggleAuthModal"
              @keyup.esc="toggleAuthModal">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a class="block rounded py-3 px-4 transition"
                href="#" @click.prevent="tab ='login' "
                :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'login',
                  'hover:text-blue-600': tab === 'register'
                }">
              Login</a>
            </li>
            <li class="flex-auto text-center">
              <a class="block rounded py-3 px-4 transition"
                href="#" @click.prevent="tab ='register' "
                :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'register',
                  'hover:text-blue-600': tab === 'login'
                }">
              Register</a>
            </li>
          </ul>

          <!-- Login Form -->
          <form v-show="tab === 'login'">
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2 w-full" for="login-email">
                <input type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:bg-cyan-200 focus:border-red-700 rounded"
                placeholder="Enter Email" id="login-email"/>

                Email
              </label>
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2 w-full" for="login-password">
                <input type="password"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:bg-cyan-200 focus:border-red-700 rounded"
                  placeholder="Password" id="login-password"/>

                Password
              </label>
            </div>
            <button type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
              Submit
            </button>
          </form>
          <!-- Registration Form -->
          <div class="text-white text-center font-bold p-5 mb-4" v-if="reg_show_alert" :class="reg_alert_variant">
            {{reg_alert_msg}}
          </div>
          <VeeForm v-show="tab === 'register'" :validation-schema="schema"
          @submit="register" :initial-values="userData">
            <!-- Name -->
            <div class="mb-3">
              <label class="inline-block mb-2 w-full" for="name-input">
                Name
                <VeeField type="text" name="name"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:bg-cyan-200 focus:border-black rounded"
                  placeholder="Enter Name" id="name-input"/>
                  <ErrorMessage class="text-red-600" name="name"/>
                </label>
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2 w-full" for="register-email">
                Email
                <VeeField type="email" name="email"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:bg-cyan-200 focus:border-black rounded"
                  placeholder="Enter Email" id="register-email"/>
                  <ErrorMessage class="text-red-600" name="email"/>
              </label>
            </div>
            <!-- Age -->
            <div class="mb-3">
              <label class="inline-block mb-2 w-full" for="age-input">
                Age
                <VeeField type="number" name="age"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                   duration-500 focus:outline-none focus:bg-cyan-200 focus:border-black rounded"
                   id="age-input"/>
                <ErrorMessage class="text-red-600" name="age"/>
              </label>
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2 w-full" for="register-password">
                Password
                <VeeField type="password" name="password"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:bg-cyan-200 focus:border-black rounded"
                  placeholder="Password" id="register-password"/>
                <ErrorMessage class="text-red-600" name="password"/>
              </label>
            </div>
            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="inline-block mb-2 w-full"
                for="register-password-confirm">
                Confirm Password
                <VeeField type="password" name="confirm_password"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:bg-cyan-200 focus:border-black rounded"
                  placeholder="Confirm Password" id="register-password-confirm"/>
                <ErrorMessage class="text-red-600" name="confirm_password"/>
              </label>
            </div>
            <!-- Country -->
            <div class="mb-3">
              <label class="inline-block mb-2 w-full" for="country-input">
                Country
                <VeeField as="select" name="country"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded" id="country-input">
                  <option value="USA">USA</option>
                  <option value="Italy">Italy</option>
                  <option value="Germany">Germany</option>
                  <option value="NotAllowed">NotAllowed</option>
                  <option value="NotAllowed2">NotAllowed2</option>
                </VeeField>
                <ErrorMessage class="text-red-600" name="country"/>
              </label>
            </div>
            <!-- TOS -->
            <div class="mb-3 pl-6">
              <label class="inline-block w-full" for="terms-input">
                <VeeField type="checkbox" name="tos" value="1"
                  class="w-4 h-4 float-left -ml-6 mt-1 rounded" id="terms-input"/>
              Accept terms of service
              </label>
              <ErrorMessage class="text-red-600" name="tos"/>
            </div>
            <button type="submit" :disabled="reg_in_submission"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
              Submit
            </button>
          </VeeForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'UserAuthModal',
  data() {
    return {
      tab: 'login',
      schema: {
        name: 'required|min:3|max:100|alfa_spaces',
        email: 'required|email',
        age: 'required|min_value:18|max_value:100',
        password: 'required|min:3|max:100',
        confirm_password: 'password_missmatch:@password',
        country: 'required|country_excluded:NotAllowed,NotAllowed2',
        tos: 'tos',
      },
      userData: {
        country: 'USA',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait! Your account is being created.',
    };
  },
  computed: {
    ...mapState(['authModalShow']),
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
    register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = 'bg-blue-500';
      this.reg_alert_msg = 'Please wait! Your account is being created.';

      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_msg = 'Success! Your Account has been created';
      console.log(values);
    },
  },

};
</script>
