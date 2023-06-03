<template>
	<div class="w-100 mx-4 my-8 d-flex flex-column ">
		<v-autocomplete
		color="primary"
		variant="outlined" 
		v-model="permissionSelected"
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
			:title="item.raw.name"
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
					<h2 class="mb-4">{{ (!permissionSelected) ? 'Create new permission' : 'Edit permission'}}</h2>
					<v-row>
						<v-col
						cols="12"
						md="4"
						>
						<v-text-field
						v-model="tempPermission.name"
						label="Permission name"
						required
						color="primary"
						variant="outlined" 
						></v-text-field>
					</v-col>
					
					<v-col
					cols="12"
					md="4"
					>
					<v-text-field
					color="primary"
					variant="outlined" 
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
			color="primary"
			variant="outlined" 
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
	color="primary"
	variant="outlined" 
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
<v-card-actions v-if="permissionSelected">
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
				color="primary"
				variant="outlined" 
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
			color="primary"
			variant="outlined" 
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
		{{(!permissionSelected) ? 'Add Permission' : 'Edit Permission' }}
	</v-btn>
</div>
<div class="w-100 d-flex justify-center text-center">
	<v-btn class="d-flex justify-start w-100 mb-2" prepend-icon="fas fa-plus" @click="rolesDialogToggle = !rolesDialogToggle"> Add Role </v-btn>
</div>
</div>

<div v-if="permissionSelected" class="w-100 p-2 d-flex flex-column">
	<div id="first" class="d-flex mb-4">
		<v-list class="w-100 d-flex justify-space-between flex-column">
			<v-list-subheader>PERMISSION</v-list-subheader>
			
			<v-list-item
			v-for="(item, i) in getItems(permissionSelected, 'perm')"
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
		v-for="(item, i) in permissionSelected.rolesIDS"
		:key="i"
		:value="item"
		>
		<v-list-item-title v-text="item.name"></v-list-item-title>
	</v-list-item>
</v-list>
</div>
</div>


</div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'vuex';
import { defineComponent } from 'vue';
import { PermissionValue } from '@/declarations/permissions';
import { ApiReturn } from '@/declarations/shared';
export default defineComponent({
	name: "PermissionsComponent",
	components: {
	},
	data(){
		return{
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
			permissionDialogToggle: false,
			rolesDialogToggle: false,
			dialogType: 'new',
			saveFunction: async () => {},  
			rolesSelected: [],
			permissionSelected: null   
		}
	},
	computed:{
		...mapState('permissionsAd', ["permissionsValues","rolesValues"])
		
	},
	methods: { 
		...mapActions({
			fetchPermissions: 'permissionsAd/fetchPermissions',
			fetchRoles: 'permissionsAd/fetchPermissions',
			savePermissionsAPI: 'permissionsAd/savePermissionsAPI',
			saveRoleAPI: 'permissionsAd/saveRoleAPI',
			deletePermissionAPI: 'permissionsAd/deletePermissionAPI',
			editPermissionAPI: 'permissionsAd/editPermissionAPI',
			swalFire: 'shared/swalFire',
		}),
		async init(){
			await this.fetchPermissions();
			await this.fetchRoles();
			this.rolesSelected = [];
			this.permissionSelected = null;
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
			const text = "Save Permission ";
			
			const ret = await this.savePermissionsAPI([this.tempPermission]);
			
			this.fireSwal(ret,text);
		},
		async editPermission(){
			const text = "Edit Permission ";
			
			let ret : ApiReturn = await this.editPermissionAPI([this.tempPermission]);
			
			this.fireSwal(ret, text)
		},
		//@ts-ignore
		async deletePermission(){
			const text = "Delete Permission ";
			
			let ret = await this.deletePermissionAPI([this.permissionSelected]);
			
			await this.fireSwal(ret, text);
			
		},
		async saveRole(){
			const text = "Save Role ";
			
			const ret = await this.saveRoleAPI([this.newRole]);
			
			await this.fireSwal(ret, text);
			
		},
		setPemissionForDialog(open = false){
			// eslint-disable-next-line no-debugger
			// debugger;
			this.tempPermission = (this.permissionSelected) ? this.permissionSelected : this.newPermission;
			this.saveFunction = (this.permissionSelected) ? this.editPermission : this.savePermission;
			this.dialogType =  (this.permissionSelected) ? 'edit' : 'new';
			this.permissionDialogToggle = open;
		},
		setItem(t: any){
			console.log("t", t)
		},
		clearSearch(){
			this.permissionSelected = null;
		},
		getItems(el: PermissionValue, type = 'perm'){
			let a : any = [];
			let keys = (type === 'perm') ? ['name', 'slug'] : [];
			keys.forEach(k => {
				a.push({title: k, value: el[k]})
			});
			return a;
		},
		async saveHandler(){
			await this.saveFunction();
		},
		async fireSwal(ret: ApiReturn, text: string , dialog = "permissions") {
			const swalOpt = {
				title: "Fail",
				text,
				icon: "error",
				showConfirtButton: true,
				confirmButtonText: "Ok"
			}
			
			if(ret.code === 500 ){
				swalOpt.title = 'Fail';
				swalOpt.text += 'Fail: server error';
				swalOpt.icon = 'error';	
			}
			else {
				if(ret.result) {
				this.newRole = {
					name: "",
					role: "",
				}
				await  this.init();
				swalOpt.title = 'Success';
				swalOpt.text += 'Success';
				swalOpt.icon = 'success';
				
				}
				else {
					swalOpt.title = 'Fail';
					swalOpt.text += 'Fail';
					swalOpt.icon = 'warning';
				}
			}

			if (dialog === "permissions") {
				this.permissionDialogToggle = !this.permissionDialogToggle
			}else{
					this.rolesDialogToggle = !this.rolesDialogToggle
				}			
			// await this.$swal.fire(swalOpt);
			await this.swalFire(swalOpt);
			if (dialog === "permissions") {
				this.permissionDialogToggle = !this.permissionDialogToggle
			}else{
					this.rolesDialogToggle = !this.rolesDialogToggle
				}			

		}
	}
})
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