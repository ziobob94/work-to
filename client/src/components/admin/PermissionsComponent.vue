<template>
    <div class="w-100 d-flex flex-column justify-center mt-auto mb-auto">
        <v-autocomplete
            clearable
            chips
            label="Select Permission"
            v-model="permissionsSelected"
            :items="permissionsCol"
            multiple
            >
        </v-autocomplete>
        <v-autocomplete
            clearable
            chips
            label="Select Roles"
            v-model="rolesSelected"
            :items="rolesCol"
            multiple
            >
        </v-autocomplete>
        <div class="buttons-wrapper">
            <div class="w-100 d-flex justify-start text-center">
                <v-dialog
                    v-model="permissionsDialog"
                    width="auto"
                    >
                    <template v-slot:activator="{ props }">
                            <v-btn class="d-flex justify-start w-100 mb-2" prepend-icon="fas fa-plus" v-bind="props" > Add Permission </v-btn>
                    </template>
                    
                    <v-card>
                        <v-card>
                            <v-form v-model="valid">
                            <v-container>
                                <v-row>
                                    <v-col
                                    cols="12"
                                    md="4"
                                    >
                                        <v-text-field
                                            v-model="newPermission.name"
                                            label="Permission name"
                                            required
                                        ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    md="4"
                                    >
                                        <v-text-field
                                            v-model="newPermission.slug"
                                            label="Permission slug"
                                            required
                                        ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    md="4"
                                    >
                                        <v-text-field
                                            v-model="newPermission.description"
                                            label="Permission desctription"
                                            required
                                        ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    md="4"
                                    >
                                    <v-select
                                        v-model="newPermission.rolesIDS"
                                        label="Select Role"
                                        :items="['amdin', 'user']"
                                        multiple
                                        ></v-select>
                                    </v-col>

                                
                                </v-row>
                            </v-container>
                            <v-card-actions>
                                <v-btn color="primary" block @click="savePermission">Save</v-btn>
                            </v-card-actions>   
                            <v-card-actions>
                                <v-btn color="primary" block @click="permissionsDialog = false">Close</v-btn>
                            </v-card-actions>
                            </v-form>
                        </v-card>

                    </v-card>
                </v-dialog>
            </div>
            <div class="w-100 d-flex justify-center text-center">
                <v-dialog
                    v-model="rolesDialog"
                    width="auto"
                    >
                    <template v-slot:activator="{ props }">
                        <v-btn class="d-flex justify-start w-100 mb-2" prepend-icon="fas fa-plus" v-bind="props"> Add Role </v-btn>
                    </template>
                    
                    <v-card>
                        <v-form v-model="valid">
                            <v-container>
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
                            <v-btn color="primary" block @click="rolesDialog = false">Close</v-btn>                        
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    name: "PermissionsComponent",
    data(){
        return{
            rolesValues: [],
            rolesCol: [],
            rolesSelected: [],
            permissionsValues: [],
            permissionsCol: [],
            permissionsSelected: null,
            permissionsDialog: false,
            rolesDialog: false,
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
    methods: {
        async init(){
            await this.getRoles();
            await this.getPermission();
        },
        async savePermission(){
            try{
                let ret = {
                    result: false,
                    message: "Save permission",
                    code: 500
                }
                ret = await this.$http.post("/api/admin/permissions", [this.newPermission]);
                // eslint-disable-next-line no-debugger
                debugger;
                console.log(ret);

            }
            catch(err){
                return null;
            }
        },
        async saveRole(){
            try{
                let ret = {
                    result: false,
                    message: "Save permission",
                    code: 500
                }
                ret = await this.$http.post("/api/admin/roles", [this.newRole]);
                // eslint-disable-next-line no-debugger
                debugger;
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
                console.log(ret);
                
                // eslint-disable-next-line no-debugger
                // debugger;
                if(ret.data.result){
                    this.permissionsValues = ret.data.data.values;
                    this.permissionsCol = ret.data.data.columns;
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
                console.log(ret);
                
                // eslint-disable-next-line no-debugger
                debugger;
                if(ret.data.result){
                    this.rolesValues = ret.data.data.values;
                    this.rolesCol = ret.data.data.columns;
                }
            }
            catch(err){
                return null;
            }
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
</style>