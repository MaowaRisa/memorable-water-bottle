import { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoredCart, removeFromLS } from "../../utilities/localstorage";
import Cart from "../Cart/Cart";
const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        fetch('bottles.json')
        .then(res=> res.json())
        .then(data=> setBottles(data))
    }, []);
    useEffect(()=>{
        console.log('called the use effect', bottles.length)
        if(bottles.length){
            const storedCart = getStoredCart();
            const savedCart = [];
            for(const id of storedCart){
                const bottle = bottles.find(bottle => bottle.id === id)
                if(bottle){
                    savedCart.push(bottle)
                }
            }
            setCart(savedCart)
        }
    }, [bottles])
    const handleAddToCart = bottle =>{
        const newCart = [...cart, bottle]
        setCart(newCart);
        addToLS(bottle.id);
    }
    const handleRemoveFromCart = id =>{
        // Visually Remove 
        const remainingCart = cart.filter(bottle => bottle.id !== id)
        setCart(remainingCart);
        // Remove from LS
        removeFromLS(id);
    }
    return (
        <div>
            <h2>Bottles Here : {bottles.length}</h2>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
            <div className="bottle-container">
            {
                bottles.map(bottle => <Bottle 
                    key={bottle.id} 
                    bottle={bottle}
                    handleAddToCart={handleAddToCart}
                    ></Bottle>)
            }
            </div>
        </div>
    );
};

export default Bottles;