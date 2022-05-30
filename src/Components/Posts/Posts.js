import React, { useState, useEffect, useContext } from 'react';
import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/FirebaseContext';
import { PostContext } from '../../store/PostContext';
import './Post.css';
import { useNavigate } from 'react-router-dom';


function Posts() {
  const { firebase } = useContext(FirebaseContext)
  const [products, setProducts] = useState([])
  const {setPostDetails} = useContext(PostContext)
  const navigate = useNavigate()
  useEffect(() => {
    firebase.firestore().collection('products').get().then((snapshot) => {
      const allPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        }
      })
      setProducts(allPost)
    })
  }, [])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => {

            return <div
              className="card"
              onClick={()=>{
                setPostDetails(product)
                navigate('/viewpost')
              }}
              
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          })

          }

        </div>
      </div>
     
    </div>
  );
}

export default Posts;
