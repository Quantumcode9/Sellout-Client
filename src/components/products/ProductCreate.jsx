// import { useState } from 'react'
// import ProductForm from '../shared/ProductForm'
// import { useNavigate } from 'react-router-dom'
// import { createProduct } from '../../api/product'
// import messages  from '../shared/AutoDismissAlert/messages'

// const ProductCreate = (props) => {
//     // pull out  props
//     const { user, msgAlert } = props

//     const navigate = useNavigate()
//     // build state object
//     const [product, setProduct] = useState({
//         category: '',
//         name: '',
//         manufacturer: '',
//         modelNumber: '',
//         regularPrice: '',
//         salePrice: '',
//         sku: '',
//         image: '',
//         image2: '',

//     })

//     const onChange = (e) => {
//         e.persist()
//         setProduct(prevProduct => {
//             const updatedName = e.target.name
//             let updatedValue = e.target.value

//             if (e.target.type === 'number') {
//                 updatedValue = parseInt(e.target.value)
//             }

//             if (e.target.type === 'checkbox') {
//                 updatedValue = e.target.checked
//             }

//             const updatedProduct = { [updatedName] : updatedValue }

//             return {
//                 ...prevProduct, ...updatedProduct
//             }
//         })
//     }

//     const onSubmit = (e) => {
//         e.preventDefault();
//         createProduct(user, product)
//         .then(res => {
//         msgAlert({
//             heading: 'Oh Yeah!',
//             message: res.data.message, 
//             variant: 'success',
//         });
//         navigate(`/products/${res.data.product._id}`);
//     })
//         .catch(err => {
//             msgAlert({
//             heading: 'Oh no!',
//             message: messages.generalError,
//             variant: 'danger'
//             });
//         });
//     };

//     console.log('the product inside create', product)
//     return (
//         <ProductForm
//             product={product}
//             handleChange={onChange}
//             handleSubmit={onSubmit}
//             heading="Add a new product!"
//         />
//     )
// }

// export default ProductCreate