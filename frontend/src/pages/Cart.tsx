import { useNavigate } from "react-router-dom"
import { useAppData } from "../context/AppContext"
import { useState } from "react"
import type { ICart, IMenuItems, IRestaurant } from "../types"
import axios from "axios"
import { restaurantService } from "../main"
import toast from "react-hot-toast"
import { BiMinus, BiPlus } from "react-icons/bi"
import { FaTruckLoading } from "react-icons/fa"
import { TbTrash } from "react-icons/tb"

const Cart = () => {
  const { cart, subtotal, Quantity, fetchCart } = useAppData()
  const navigate = useNavigate()

  const [loadingItemId, setLoadingItemId] = useState<string | null>(null)
  const [clearingCart, setClearingCart] = useState<boolean>(false)

  if (!cart || cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500 text-lg">Your cart is empty</p>
      </div>
    )
  }

  const restaurant = cart[0].restaurantId as IRestaurant;

  const deliveryFee = subtotal < 250 ? 49 : 0;
  const platformFee = 7;
  const grandTotal = subtotal + deliveryFee + platformFee;

  const increaseQty = async (itemId: string) => {
    try {
      setLoadingItemId(itemId)
      await axios.put(`${restaurantService}/api/cart/inc`, { itemId }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      await fetchCart()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoadingItemId(null)
    }
  }

  const decreaseQty = async (itemId: string) => {
    try {
      setLoadingItemId(itemId)
      await axios.put(`${restaurantService}/api/cart/dec`, { itemId }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      await fetchCart()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoadingItemId(null)
    }
  }

  const clearCart = async () => {
    const confirm = window.confirm("Are you sure you want to clear your cart?")
    if (!confirm) return;
    try {
      setClearingCart(true)
      await axios.delete(`${restaurantService}/api/cart/clear`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      await fetchCart()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setClearingCart(false)
    }
  }

  const checkout = () => {
    navigate("/checkout")
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 space-y-6">
      {/* Restaurant Info */}
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="text-xl font-semibold">{restaurant.name}</h2>
        <p className="text-sm text-gray-500 mt-1">
          {restaurant.autoLocation.formattedAddress}
        </p>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((cartItem: ICart) => {
          const item = cartItem.itemId as IMenuItems;
          const isLoading = loadingItemId === item._id;

          return (
            <div
              key={item._id}
              className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded-lg object-cover"
              />

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">₹{item.price}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="hover:bg-gray-200 p-1.5 rounded-full border border-gray-300 disabled:opacity-50 transition-colors"
                    onClick={() => decreaseQty(item._id)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <FaTruckLoading size={14} className="animate-spin" />
                    ) : (
                      <BiMinus size={14} />
                    )}
                  </button>

                  <span className="w-6 text-center font-medium text-sm">
                    {cartItem.quantity}
                  </span>

                  <button
                    className="hover:bg-gray-200 p-1.5 rounded-full border border-gray-300 disabled:opacity-50 transition-colors"
                    onClick={() => increaseQty(item._id)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <FaTruckLoading size={14} className="animate-spin" />
                    ) : (
                      <BiPlus size={14} />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-right font-semibold text-gray-900 whitespace-nowrap">
                ₹{item.price * cartItem.quantity}
              </p>
            </div>
          )
        })}
      </div>

      {/* Bill Details */}
      <div className="rounded-xl bg-white p-4 shadow-sm space-y-3">
        <h3 className="font-semibold text-gray-900 text-base">Bill Details</h3>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Total Items</span>
          <span className="text-gray-900">{Quantity}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span className="text-gray-900">₹{subtotal}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Delivery Fee</span>
          <span className="text-gray-900">
            {deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}
          </span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Platform Fee</span>
          <span className="text-gray-900">₹{platformFee}</span>
        </div>

        {subtotal < 250 && (
          <p className="text-xs text-orange-600">
            Add items worth ₹{250 - subtotal} more to get free delivery
          </p>
        )}

        <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-3 text-gray-900">
          <span>Grand Total</span>
          <span>₹{grandTotal}</span>
        </div>

        <button
          onClick={checkout}
          className={`mt-3 w-full rounded-lg bg-[#E23744] py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 ${
            !restaurant.isOpen ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!restaurant.isOpen}
        >
          {!restaurant.isOpen
            ? "Restaurant is closed — please check back later"
            : "Proceed to Checkout"}
        </button>

        <button
          onClick={clearCart}
          className="mt-2 w-full rounded-lg border border-gray-300 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center gap-2"
          disabled={clearingCart}
        >
          {clearingCart ? "Clearing..." : "Clear Cart"}
          <TbTrash size={16} />
        </button>
      </div>
    </div>
  )
}

export default Cart