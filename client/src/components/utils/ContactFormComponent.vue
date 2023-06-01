<template>
    <div class="contact-from-container">
        <form>
            <h1>Contact Form</h1>
            <form accept-charset="UTF-8" action="https://www.formbackend.com/f/{your-identifier}" method="POST">
              <div class="form-fields">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
              </div>
        
              <div class="form-fields">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
              </div>
        
              <div class="form-fields">
                <label for="message">Message</label>
                <textarea id="message" name="message" required></textarea>
              </div>
        
              <button type="submit">Send message</button>
            </form>
        </form>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name:'ContactFormComponent',
    data(){
        return{

        }
    },
    methods:{

    }
})
</script>