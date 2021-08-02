import { reactive } from "vue";

const state = reactive({
  //este valor tiene q ser false para que el usuario se tenga que loggear para usar la app
  //está en true para desarrollo mas comodo
  logged: false,
  //este valor tiene q ser "" para acceder al usuario que corresponda
  //está en juan para no tener q logearme siempre
  currentUser: "",
});

export default {
  state,
};
