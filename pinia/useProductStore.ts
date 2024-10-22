import product_data from '@/data/product-data';
import { defineStore } from "pinia";
import { ref } from "vue";
import {fotosArticulosInterface} from "@/types/interfaces/CategoriaInterface";

export const useProductStore = defineStore("product", () => {

  let activeImg = ref<string>(product_data[0].img);
  let openFilterDropdown = ref<boolean>(false);
  let openFilterOffcanvas = ref<boolean>(false);
  let imgsView            = ref<fotosArticulosInterface[] | []>([])
  let colorSeleccionado   = ref<string>('');
  let activeMoreFiveImgs  = ref<boolean>(false);
  let activeLessFiveImgs  = ref<boolean>(false);
  let indexFoto           = ref<number>(0);
  let lastIndex           = ref<number>(0);
  // handle image active
  const handleImageActive = (img: string) => {
    activeImg.value = img;
  };

  // handle image active
  const handleOpenFilterDropdown = () => {
    openFilterDropdown.value = !openFilterDropdown.value
  };

  // handle image active
  const handleOpenFilterOffcanvas = () => {
    openFilterOffcanvas.value = !openFilterOffcanvas.value
  };

  const changeColorImg = (color: string) =>{
    colorSeleccionado.value = color;
  };

  const imgsSeleccionadasXColor = (imgs: fotosArticulosInterface[]) =>{
    // @ts-ignore
    let fotos:fotosArticulosInterface[] = imgs.filter(item=>item.color === colorSeleccionado.value);
    if (fotos.length > 5){
      imgsView.value = fotos.filter((item, index) =>index < 5);
      activeMoreFiveImgs.value = true;
    }else{
      activeMoreFiveImgs.value = false;
      imgsView.value = fotos;
    }
    activeImg.value = fotos[0].url.toString();
  }

  const verMasImagenes = (tipo:Number, imgs: fotosArticulosInterface[]) =>{
    let fotos:fotosArticulosInterface[] = imgs.filter(item=>item.color === colorSeleccionado.value);
    let cantidadFotos = imgs.length;
    if (tipo === 1){
      if (lastIndex.value <= cantidadFotos){
        indexFoto.value++;
        lastIndex.value     = indexFoto.value + 5;
        imgsView.value = fotos.filter((item, index) =>index >= indexFoto.value && index < lastIndex.value);
      }
    }else if (tipo === 0){
      indexFoto.value--;
      lastIndex.value--;
      imgsView.value = fotos.filter((item, index) =>index >= indexFoto.value && index < lastIndex.value);

    }
    activeMoreFiveImgs.value = lastIndex.value !== cantidadFotos;
    activeLessFiveImgs.value = indexFoto.value > 0;
  }

  return {
    activeImg,
    handleImageActive,
    handleOpenFilterDropdown,
    openFilterDropdown,
    openFilterOffcanvas,
    handleOpenFilterOffcanvas,
    changeColorImg,
    colorSeleccionado,
    imgsSeleccionadasXColor,
    imgsView,
    activeMoreFiveImgs,
    verMasImagenes,
    activeLessFiveImgs
  };
});
