import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import {
  getCart,
  getTotalCartPizzas,
  getTotalCartPrice,
} from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";
import { useState } from "react";
import { formatCurrency } from "../../utilities/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [priorityPrice, setPriorityPrice] = useState(false);
  const cart = useSelector(getCart);
  const cartPrice = useSelector(getTotalCartPrice);
  const totalPrice = cartPrice + (priorityPrice ? 0.2 * cartPrice : 0);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const userName = useSelector((state) => state.user.userName);
  const formErrors = useActionData();

  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            defaultValue={userName}
            type="text"
            name="customer"
            required
            className="input grow"
          />
        </div>

        <div
          className={`mb-5 flex flex-col gap-2 sm:flex-row ${formErrors?.phone ? "sm:items-start" : "sm:items-center"}`}
        >
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={priorityPrice}
            onChange={(e) => setPriorityPrice(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-1"
          />
          <label htmlFor="priority" className="font-semibold">
            Want to yo give your order priority?
          </label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? "Submitting"
              : `Order Now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  let errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please provide a valid phone number";
  if (Object.keys(errors).length > 0) return errors;
  // if we don't have any error create new order and redirect
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
