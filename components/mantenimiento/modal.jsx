import {  View, Modal, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

/**
 * ModalComponent es un componente que muestra un modal de imagen con un botón de cierre.
 *
 * @component
 * @param {Object} images - El objeto de imágenes que contiene las propiedades selectedImage e isImagePreviewVisible.
 * @param {function} setImage - La función para actualizar el objeto de imágenes.
 * @returns {JSX.Element} El ModalComponent renderizado.
 */
const ModalComponent = ({ images, setImage}) => {
  return (
    <Modal
    visible={images.isImagePreviewVisible} // El modal se muestra si isImagePreviewVisible es verdadero
    transparent={true} // El modal es transparente
    onRequestClose={() => // Función que se ejecuta cuando se solicita cerrar el modal (por ejemplo, al presionar el botón de retroceso en Android)
      setImage((prevState) => ({ // Actualiza el estado de las imágenes
        ...prevState, // Mantiene el estado anterior
        selectedImage: null, // Elimina la imagen seleccionada
        isImagePreviewVisible: false, // Oculta el modal
      }))
    }
  >
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semi-transparente
        justifyContent: "center", // Centra los hijos verticalmente
        alignItems: "center", // Centra los hijos horizontalmente
      }}
    >
      {images.selectedImage && ( // Si hay una imagen seleccionada, la muestra
        <Image
          source={{ uri: images.selectedImage }} // La imagen seleccionada
          style={{ width: "100%", height: "100%" }} // La imagen ocupa todo el espacio disponible
          resizeMode="contain" // La imagen se ajusta para que se vea completa sin recortes
        />
      )}

      <TouchableOpacity
        onPress={() => // Al presionar el botón, oculta el modal y elimina la imagen seleccionada
          setImage({ selectedImage: null, isImagePreviewVisible: false })
        }
        style={{ position: "absolute", top: 40, right: 20 }} // Posiciona el botón en la esquina superior derecha
      >
        <Icon name="close" size={30} color="#fff" /> 
      </TouchableOpacity>
    </View>
  </Modal>
  );
};

export default ModalComponent;