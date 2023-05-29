<template>
    <div class="w-100 mx-4 my-8 d-flex flex-column ">
         <v-autocomplete
              v-model="permissionsSelected"
              :items="permissionsValues"
              chips
              clearable
              closable-chips
              item-title="name"
              item-value="slug"
              label="Select Permission"
              return-object
            >
              <template v-slot:chip="{ props, item }">
                <v-chip
                  v-bind="props"
                  :text="item.raw.name"
                ></v-chip>
              </template>

              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :title="item?.raw?.name"
                ></v-list-item>
              </template>
        </v-autocomplete>

        <div class="w-100 d-flex justify-center text-center">
            <v-dialog
                v-model="permissionDialogToggle"
                width="100%"
                >
                <v-card>
                    <v-form >
                        <v-container>
                            <h2 class="mb-4">{{ (!permissionsSelected) ? 'Create new permission' : 'Edit permission'}}</h2>
                            <v-row>
                                <v-col
                                cols="12"
                                md="4"
                                >
                                <v-text-field
                                    v-model="tempPermission.name"
                                    label="Permission name"
                                    required
                                ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    md="4"
                                    >
                                    <v-text-field
                                        v-model="tempPermission.slug"
                                        label="Permission slug"
                                        required
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                cols="12"
                                md="4"
                                >
                                </v-col>

                                <v-col
                                cols="12"
                                md="4"
                                >
                                <v-text-field
                                    v-model="tempPermission.description"
                                    label="Permission description"
                                    required
                                ></v-text-field>
                                </v-col>

                                <v-col
                                cols="12"
                                md="4"
                                >
                                </v-col>


                                <v-autocomplete
                                    clearable
                                    chips
                                    label="Select Roles"
                                    v-model="tempPermission.rolesIDS"
                                    :items="rolesValues"
                                    item-title="name"
                                    item-value="role"
                                    multiple
                                    class="mx-2"
                                    return-object
                                    >
                                </v-autocomplete>

                            </v-row>
                        </v-container>
                    </v-form>
                    <v-card-actions>
                        <v-btn color="primary" block @click="saveHandler">Save</v-btn>
                    </v-card-actions>
                    <v-card-actions v-if="permissionsSelected">
                        <v-btn color="primary" block @click="deletePermission">Delete</v-btn>
                    </v-card-actions>
                    <v-card-actions>
                        <v-btn color="primary" block @click="permissionDialogToggle = false">Close</v-btn>                        
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>

        <v-dialog
                v-model="rolesDialogToggle"
                width="100%"
                >
                <v-card>
                    <v-form >
                        <v-container>                            
                            <h2 class="mb-4">Create role</h2>
                            <v-row>
                                <v-col
                                cols="12"
                                md="4"
                                >
                                <v-text-field
                                    v-model="newRole.name"
                                    label="Role name"
                                    required
                                ></v-text-field>
                                </v-col>

                                <v-col
                                cols="12"
                                md="4"
                                >
                                <v-text-field
                                    v-model="newRole.role"
                                    label="Role ID"
                                    required
                                ></v-text-field>
                                </v-col>

                                <v-col
                                cols="12"
                                md="4"
                                >
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                    <v-card-actions>
                        <v-btn color="primary" block @click="saveRole">Save</v-btn>
                    </v-card-actions>
                    <v-card-actions>
                        <v-btn color="primary" block @click="rolesDialogToggle = false">Close</v-btn>                        
                    </v-card-actions>
                </v-card>
        </v-dialog>
        
        <div class="buttons-wrapper">
            <div class="w-100 d-flex justify-start text-center">
                <v-btn class="d-flex justify-start w-100 mb-2" 
                        @click="setPemissionForDialog(true)" 
                        prepend-icon="fas fa-plus" > 
                        {{(!permissionsSelected) ? 'Add Permission' : 'Edit Permission' }}
                </v-btn>
            </div>
            <div class="w-100 d-flex justify-center text-center">
                <v-btn class="d-flex justify-start w-100 mb-2" prepend-icon="fas fa-plus" @click="rolesDialogToggle = !rolesDialogToggle"> Add Role </v-btn>
            </div>
        </div>



        <div v-if="permissionsSelected" class="w-100 p-2 d-flex flex-column">
            <div id="first" class="d-flex mb-4">
                <v-list>
                    <v-list-subheader>PERMISSION</v-list-subheader>

                    <v-list-item
                        v-for="(item, i) in getItems(permissionsSelected, 'perm')"
                        :key="i"
                        :value="item"
                    >
                        <template v-slot:prepend>
                            <label>{{ item.title.toUpperCase() }}</label>
                        </template>

                        <v-list-item-title class="ml-4" v-text="item.value"></v-list-item-title>
                    </v-list-item>
                    </v-list>
            </div>
            <div id="second"> 
                <v-list class="d-flex flex-column">
                    <v-list-subheader>ROLES</v-list-subheader>

                    <v-list-item
                        v-for="(item, i) in permissionsSelected.rolesIDS"
                        :key="i"
                        :value="item"
                    >
                        <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item>
                </v-list>
            </div>
        </div>


    </div>
</template>

<script>
export default {
    name: "PermissionsComponent",
    components: {
    },
    data(){
        return{
            permissionsValues: [],
            permissionsSelected: null,
            newRole:{
                name: "",
                role: "",
            },
            newPermission:{
                name: "",
                slug: "",
                description: "",
                rolesIDS: []
            },
            tempPermission: null,
            rolesValues: [],
            rolesSelected: [],
            permissionDialogToggle: false,
            rolesDialogToggle: false,
            dialogType: 'new',
            saveFunction: null,            
        }
    },
    async mounted() {
       try { 
            await this.init();
        }
        catch(err) {
            console.error("[PermissionComponent.mounted] ERROR: ", err.message)
        }
    },
    computed:{
    },
    methods: {
        async init(){
            await this.getRoles();
            await this.getPermission();
            this.rolesSelected = [];
            this.permissionsSelected = null;
            this.dialogType = 'new';
            this.newRole = {
                name: "",
                role: "",
            }
            this.newPermission = {
                name: "",
                slug: "",
                description: "",
                rolesIDS: []
            }
        },
        async savePermission(){
            const swalOpt = {
                    title: "Fail",
                    text: "Save Permission ",
                    icon: "error",
                    showConfirtButton: true,
                    confirmButtonText: "Ok"
            }
            try{

                let ret = {
                    result: false,
                    message: "Save permission",
                    code: 500
                }
                ret = await this.$http.post("/api/admin/permissions", [this.tempPermission]);

                if(ret.data.result) {
                    this.newPermission = {
                        name: "",
                        slug: "",
                        description: "",
                        rolesIDS: []
                    }
                    this.permissionDialogToggle = false;
                    await  this.init()
                    swalOpt.title = 'Success';
                    swalOpt.text += 'Success';
                    swalOpt.icon = 'success';

                }
                else {
                    swalOpt.title = 'Fail';
                    swalOpt.text += 'Fail';
                    swalOpt.icon = 'warning';
                }
                console.log(ret);

            }
            catch(err){
                swalOpt.title = 'Fail';
                swalOpt.text += 'Fail: server error';
                swalOpt.icon = 'error';
            }

            this.$swal.fire(swalOpt);
        },

        async editPermission(){
            // eslint-disable-next-line no-debugger
            // debugger
            const swalOpt = {
                    title: "Fail",
                    text: "Edit Permission ",
                    icon: "error",
                    showConfirtButton: true,
                    confirmButtonText: "Ok"
            }
            try{

                let ret = {
                    result: false,
                    message: "Save permission",
                    code: 500
                }
                
                ret = await this.$http.put("/api/admin/permissions", [this.tempPermission]);

                if(ret.data.result) {
                    this.permissionDialogToggle = false;
                    await  this.init()
                    swalOpt.title = 'Success';
                    swalOpt.text += 'Success';
                    swalOpt.icon = 'success';

                }
                else {
                    swalOpt.title = 'Fail';
                    swalOpt.text += 'Fail';
                    swalOpt.icon = 'warning';
                }
                console.log(ret);

            }
            catch(err){
                swalOpt.title = 'Fail';
                swalOpt.text += 'Fail: server error';
                swalOpt.icon = 'error';
            }

            this.$swal.fire(swalOpt);
        },
        async deletePermission(){
            // eslint-disable-next-line no-debugger
            const swalOpt = {
                    title: "Fail",
                    text: "Edit Permission ",
                    icon: "error",
                    showConfirtButton: true,
                    confirmButtonText: "Ok"
            }
            try{

                let ret = {
                    result: false,
                    message: "Save permission",
                    code: 500
                }
                
                ret = await this.$http.delete(`/api/admin/permissions/${this.tempPermission._id}`);
                // eslint-disable-next-line no-debugger
                // debugger;

                if(ret.data.result) {
                    this.permissionDialogToggle = false;
                    await  this.init()
                    swalOpt.title = 'Success';
                    swalOpt.text += 'Success';
                    swalOpt.icon = 'success';

                }
                else {
                    swalOpt.title = 'Fail';
                    swalOpt.text += 'Fail';
                    swalOpt.icon = 'warning';
                }
                console.log(ret);

            }
            catch(err){
                swalOpt.title = 'Fail';
                swalOpt.text += 'Fail: server error';
                swalOpt.icon = 'error';
            }

            this.$swal.fire(swalOpt);
        },
        async saveRole(){
            try{
                 // eslint-disable-next-line no-debugger
                // debugger
                let ret = {
                    result: false,
                    message: "Save permission",
                    code: 500
                }
                ret = await this.$http.post("/api/admin/roles", [this.newRole]);

                console.log(ret);

            }
            catch(err){
                return null;
            }
        },
        async getPermission(){
            try{
                let ret = {
                    result: false,
                    message: "Save permission",
                    code: 500
                }
                ret = await this.$http.get("/api/admin/permissions");
                // console.log(ret);
                if(ret.data.result){
                    this.permissionsValues = ret.data.data;
                }
            }
            catch(err){
                return null;
            }
        },
        async getRoles(){
            try{
                let ret = {
                    result: false,
                    message: "Save roles ",
                    code: 500
                }
                ret = await this.$http.get("/api/admin/roles");
                // console.log(ret);
                
                // eslint-disable-next-line no-debugger
                // debugger;
                if(ret.data.result){
                    this.rolesValues = ret.data.data;
                }
            }
            catch(err){
                return null;
            }
        },
        setPemissionForDialog(open = false){
            // eslint-disable-next-line no-debugger
           // debugger;
            this.tempPermission = (this.permissionsSelected) ? this.permissionsSelected : this.newPermission;
            this.saveFunction = (this.permissionsSelected) ? this.editPermission : this.savePermission;
            this.dialogType =  (this.permissionsSelected) ? 'edit' : 'new';
            this.permissionDialogToggle = open;
        },
        setItem(t){
            console.log("t", t)
        },
        clearSearch(){
            this.permissionsSelected = null;
        },
        getItems(el, type = 'perm'){
            let a = [];
            let keys = (type === 'perm') ? ['name', 'slug'] : [];
            keys.forEach(k => {
                a.push({title: k, value: el[k]})
            });
            return a;
        },
        async saveHandler(){
            await this.saveFunction();
        }
    }
}
</script>

<style lang="scss" scoped>
.buttons-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 55%;
    & > * {
        width: 100%;
    }
}
.dialog-wrapper{
    position: absolute;
    height: 100%;
    width: 100%;
}
</style>