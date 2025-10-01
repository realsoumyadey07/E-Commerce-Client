import MinFooter from "@/components/MinFooter";
import ReactLoadingComp from "@/components/ReactLoadingComp";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { productDetails } from "@/redux/slices/product.slice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createAddress,
  getMyAddress,
  updateAddress,
} from "@/redux/slices/address.slice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createOrder } from "@/redux/slices/order.slice";
import CustomDialogbox from "@/components/CustomDialogbox";
import { AdvancedImage } from "@cloudinary/react";
import { createOptimizedImage } from "@/lib/cloudinary";
import { ChevronLeft } from "lucide-react";

const addressSchema = yup.object({
  name: yup.string().required("Name is required!"),
  phoneNumber: yup
    .string()
    .required("Phone number is required!")
    .min(10, "Phone number must be atleast 10 digits")
    .max(10, "Phone number must be atmost 10 digits"),
  pincode: yup
    .string()
    .required("Pincode is required!")
    .min(6, "Pincode must be atleast 6 digits")
    .max(6, "Pincode must be atmost 6 digits"),
  locality: yup.string().required("Locality is required!"),
  area: yup.string().required("Area is required!"),
  city: yup.string().required("City is required!"),
  district: yup.string().required("District is required!"),
  state: yup.string().required("State is required!"),
  landmark: yup.string().required("Landmark is required!"),
  addressType: yup
    .string()
    .oneOf(["home", "work"])
    .required("Address type is required!"),
});

export type AddressFormData = yup.InferType<typeof addressSchema>;

export default function CheckoutScreen() {
  const [screen, setScreen] = useState<"checkout" | "payment">("checkout");
  const { id } = useParams();
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const { product, isLoading } = useAppSelector((state) => state.product);
  const { userData } = useAppSelector((state) => state.user);
  const { address, isLoadingAddress } = useAppSelector(
    (state) => state.address
  );

  const [quantity, setQuantity] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
  });

  useEffect(() => {
    if (id) dispatch(productDetails(id));
    dispatch(getMyAddress());
  }, [id, dispatch]);

  if (isLoading || isLoadingAddress) return <ReactLoadingComp />;

  // Calculate totals
  const price = product?.price || 0;
  const totalPrice = price * quantity;
  const totalPayable = totalPrice;

  // update address credentials

  const addAddressPromise = async (data: AddressFormData) => {
    dispatch(createAddress(data));
  };

  const handleAddAddress = (data: AddressFormData) => {
    console.log(data);
    toast
      .promise(addAddressPromise(data), {
        loading: "Adding address...",
        success: <b>Address added successfully!</b>,
        error: (err) => <b>{err || "Could not add address."}</b>,
      })
      .then(() => {
        dispatch(getMyAddress());
      });
  };

  const createOrderPromise = async () => {
    dispatch(
      createOrder({
        products: [{ productId: id as string, quantity, price }],
        totalAmount: totalPayable,
        paymentMethod: "cod",
        addressId: address?._id as string,
      })
    );
  };

  const handleCreateOrder = () => {
    toast
      .promise(createOrderPromise(), {
        loading: "Creating order...",
        success: <b>Order placed successfully!</b>,
        error: (err) => <b>{err || "Could not create order."}</b>,
      })
      .then(() => navigation("/orders"));
  };

  const changeAddressPromise = async (data: AddressFormData) => {
    dispatch(
      updateAddress({
        addressId: address?._id as string,
        addressData: data,
      })
    );
  };

  const handleChangeAddress = (data: AddressFormData) => {
    toast
      .promise(changeAddressPromise(data), {
        loading: "Changing address...",
        success: <b>Address changed successfully!</b>,
        error: (err) => <b>{err || "Could not change address."}</b>,
      })
      .then(() => {
        dispatch(getMyAddress());
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      <div className="items-center bg-white w-full shadow md:hidden block p-3">
        <ChevronLeft
          className="cursor-pointer"
          color="gray"
          onClick={() => {
            if(screen === "payment") {
              setScreen("checkout");
            }else {
              navigation(-1);
            }
          }}
        />
      </div>
      {screen === "checkout" ? (
        <div className="flex-1 flex justify-center p-4">
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Section */}
            <div className="md:col-span-2 space-y-4">
              {/* Login */}
              <Card className="rounded-2xl shadow-sm">
                <CardHeader className="flex flex-row justify-between items-center">
                  <CardTitle className="text-lg font-semibold">
                    1. LOGIN
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{userData?.name}</p>
                  <p className="text-sm text-gray-500">{userData?.email}</p>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              {address ? (
                <Card className="rounded-2xl shadow-sm">
                  <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle className="text-lg font-semibold">
                      2. DELIVERY ADDRESS
                    </CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="rounded">
                          Change
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="text-center">
                            Change Address
                          </DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(handleChangeAddress)}>
                          <div className="grid gap-4 max-h-[50vh] overflow-y-auto pr-2 no-scrollbar">
                            {/* Name */}
                            <div className="grid gap-2">
                              <Label htmlFor="name">Name</Label>
                              <Input
                                id="name"
                                placeholder="Full Name"
                                defaultValue={address?.name}
                                {...register("name")}
                              />
                            </div>

                            {/* Phone Number */}
                            <div className="grid gap-2">
                              <Label htmlFor="phoneNumber">Phone Number</Label>
                              <Input
                                id="phoneNumber"
                                placeholder="10-digit phone number"
                                defaultValue={address?.phoneNumber}
                                {...register("phoneNumber")}
                              />
                            </div>

                            {/* Pincode */}
                            <div className="grid gap-2">
                              <Label htmlFor="pincode">Pincode</Label>
                              <Input
                                id="pincode"
                                placeholder="6-digit Pincode"
                                defaultValue={address?.pincode}
                                {...register("pincode")}
                              />
                            </div>

                            {/* Locality */}
                            <div className="grid gap-2">
                              <Label htmlFor="locality">Locality</Label>
                              <Input
                                id="locality"
                                placeholder="Locality"
                                defaultValue={address?.locality}
                                {...register("locality")}
                              />
                            </div>

                            {/* Area */}
                            <div className="grid gap-2">
                              <Label htmlFor="area">Area</Label>
                              <Input
                                id="area"
                                placeholder="Area/Street"
                                defaultValue={address?.area}
                                {...register("area")}
                              />
                            </div>

                            {/* City */}
                            <div className="grid gap-2">
                              <Label htmlFor="city">City</Label>
                              <Input
                                id="city"
                                placeholder="City"
                                defaultValue={address?.city}
                                {...register("city")}
                              />
                            </div>

                            {/* District */}
                            <div className="grid gap-2">
                              <Label htmlFor="district">District</Label>
                              <Input
                                id="district"
                                placeholder="District"
                                defaultValue={address?.district}
                                {...register("district")}
                              />
                            </div>

                            {/* State */}
                            <div className="grid gap-2">
                              <Label htmlFor="state">State</Label>
                              <Input
                                id="state"
                                placeholder="State"
                                defaultValue={address?.state}
                                {...register("state")}
                              />
                            </div>

                            {/* Landmark */}
                            <div className="grid gap-2">
                              <Label htmlFor="landmark">Landmark</Label>
                              <Input
                                id="landmark"
                                placeholder="Nearby Landmark"
                                defaultValue={address?.landmark}
                                {...register("landmark")}
                              />
                            </div>

                            {/* Address Type */}
                            <div className="grid gap-2">
                              <Label>Address Type</Label>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    value="home"
                                    defaultChecked={
                                      address?.addressType === "home"
                                    }
                                    {...register("addressType")}
                                  />
                                  Home
                                </label>
                                <label className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    value="work"
                                    {...register("addressType")}
                                    defaultChecked={
                                      address?.addressType === "work"
                                    }
                                  />
                                  Work
                                </label>
                              </div>
                              {errors.addressType && (
                                <p className="text-sm text-red-600">
                                  {String(errors.addressType.message)}
                                </p>
                              )}
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                              type="submit"
                              className="bg-green-500 hover:bg-green-600 rounded"
                            >
                              Change Address
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{address?.name}</p>
                    <p className="text-sm text-gray-500">
                      {address?.area}, {address?.city} - {address?.pincode}
                    </p>
                    <p className="text-sm text-gray-500">
                      Phone: {address?.phoneNumber}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      2. DELIVERY ADDRESS
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Add your shipping address
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-green-500 hover:bg-green-600 rounded">
                          Add Address
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="text-center">
                            Add Address
                          </DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(handleAddAddress)}>
                          <div className="grid gap-4 max-h-[50vh] overflow-y-auto pr-2 no-scrollbar">
                            {/* Name */}
                            <div className="grid gap-2">
                              <Label htmlFor="name">Name</Label>
                              <Input
                                id="name"
                                placeholder="Full Name"
                                {...register("name")}
                              />
                              {errors?.name?.message && (
                                <p className="text-sm text-red-600">
                                  {String(errors.name.message)}
                                </p>
                              )}
                            </div>

                            {/* Phone Number */}
                            <div className="grid gap-2">
                              <Label htmlFor="phoneNumber">Phone Number</Label>
                              <Input
                                id="phoneNumber"
                                placeholder="10-digit phone number"
                                {...register("phoneNumber")}
                              />
                              {errors.phoneNumber && (
                                <p className="text-sm text-red-600">
                                  {String(errors.phoneNumber.message)}
                                </p>
                              )}
                            </div>

                            {/* Pincode */}
                            <div className="grid gap-2">
                              <Label htmlFor="pincode">Pincode</Label>
                              <Input
                                id="pincode"
                                placeholder="6-digit Pincode"
                                {...register("pincode")}
                              />
                              {errors.pincode && (
                                <p className="text-sm text-red-600">
                                  {String(errors.pincode.message)}
                                </p>
                              )}
                            </div>

                            {/* Locality */}
                            <div className="grid gap-2">
                              <Label htmlFor="locality">Locality</Label>
                              <Input
                                id="locality"
                                placeholder="Locality"
                                {...register("locality")}
                              />
                              {errors.locality && (
                                <p className="text-sm text-red-600">
                                  {String(errors.locality.message)}
                                </p>
                              )}
                            </div>

                            {/* Area */}
                            <div className="grid gap-2">
                              <Label htmlFor="area">Area</Label>
                              <Input
                                id="area"
                                placeholder="Area/Street"
                                {...register("area")}
                              />
                              {errors.area && (
                                <p className="text-sm text-red-600">
                                  {String(errors.area.message)}
                                </p>
                              )}
                            </div>

                            {/* City */}
                            <div className="grid gap-2">
                              <Label htmlFor="city">City</Label>
                              <Input
                                id="city"
                                placeholder="City"
                                {...register("city")}
                              />
                              {errors.city && (
                                <p className="text-sm text-red-600">
                                  {String(errors.city.message)}
                                </p>
                              )}
                            </div>

                            {/* District */}
                            <div className="grid gap-2">
                              <Label htmlFor="district">District</Label>
                              <Input
                                id="district"
                                placeholder="District"
                                {...register("district")}
                              />
                              {errors.district && (
                                <p className="text-sm text-red-600">
                                  {String(errors.district.message)}
                                </p>
                              )}
                            </div>

                            {/* State */}
                            <div className="grid gap-2">
                              <Label htmlFor="state">State</Label>
                              <Input
                                id="state"
                                placeholder="State"
                                {...register("state")}
                              />
                              {errors.state && (
                                <p className="text-sm text-red-600">
                                  {String(errors.state.message)}
                                </p>
                              )}
                            </div>

                            {/* Landmark */}
                            <div className="grid gap-2">
                              <Label htmlFor="landmark">Landmark</Label>
                              <Input
                                id="landmark"
                                placeholder="Nearby Landmark"
                                {...register("landmark")}
                              />
                              {errors.landmark && (
                                <p className="text-sm text-red-600">
                                  {String(errors.landmark.message)}
                                </p>
                              )}
                            </div>

                            {/* Address Type */}
                            <div className="grid gap-2">
                              <Label>Address Type</Label>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    value="home"
                                    {...register("addressType")}
                                  />
                                  Home
                                </label>
                                <label className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    value="work"
                                    {...register("addressType")}
                                  />
                                  Work
                                </label>
                              </div>
                              {errors.addressType && (
                                <p className="text-sm text-red-600">
                                  {String(errors.addressType.message)}
                                </p>
                              )}
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                              type="submit"
                              className="bg-green-500 hover:bg-green-600 rounded"
                            >
                              Add Address
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              )}

              {/* Order Summary */}
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    3. ORDER SUMMARY
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Product Item */}
                  {product && (
                    <div className="flex gap-4">
                      <AdvancedImage
                        cldImg={createOptimizedImage(product?.images[0]?.url)}
                        alt={product?.product_name}
                        className="w-20 h-20 rounded-lg border"
                      />
                      <div className="flex flex-col justify-between w-full items-start sm:flex-row">
                        <div className="flex flex-col w-full">
                          <h3 className="font-semibold">
                            {product.product_name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-lg font-semibold">
                              ₹{price}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-2 mt-2 w-full">
                          <div className="flex justify-between items-center gap-1 w-full">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() =>
                                setQuantity((q) => Math.max(1, q - 1))
                              }
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              value={quantity}
                              className="w-16 text-center"
                              readOnly
                            />
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => setQuantity((q) => q + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <CustomDialogbox
                            buttonName="Remove"
                            dialogTitle="Remove Product"
                            dialogDescription="Do you want to remove this product??"
                            extraButton="Remove Anyway"
                            onClick={() => {
                              setQuantity(0);
                              navigation(-1);
                            }}
                            buttonClassName="text-white hover:text-white bg-red-600 hover:bg-red-700 md:w-auto w-full rounded"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <p className="text-sm text-yellow-600">
                    Open Box Delivery is eligible for this item. You will
                    receive a confirmation post payment.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right Section (Price Details) */}
            <div>
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    PRICE DETAILS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Price ({quantity} item)</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total Payable</span>
                    <span>₹{totalPayable}</span>
                  </div>
                  <p className="text-green-600 text-sm">
                    Your Total Savings on this order
                  </p>
                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700 rounded"
                    onClick={() => setScreen("payment")}
                  >
                    Place Order
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex-1 flex justify-center p-6">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Section - Payment Options */}
            <div className="md:col-span-2 space-y-4">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Complete Payment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* UPI */}
                  <div className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                    <div>
                      <p className="font-medium">UPI</p>
                      <p className="text-sm text-gray-500">
                        Pay by any UPI app
                      </p>
                      <p className="text-sm text-green-600">
                        Save upto ₹30 • 4 offers available
                      </p>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                    <div>
                      <p className="font-medium">Credit / Debit / ATM Card</p>
                      <p className="text-sm text-gray-500">
                        Add and secure cards as per RBI guidelines
                      </p>
                      <p className="text-sm text-green-600">
                        Get upto 5% cashback • 2 offers available
                      </p>
                    </div>
                  </div>

                  {/* Net Banking */}
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <p className="font-medium">Net Banking</p>
                  </div>

                  {/* COD */}
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <p className="font-medium">Cash on Delivery</p>
                  </div>

                  {/* Gift Card */}
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <p className="font-medium">Have a Flipkart Gift Card?</p>
                  </div>

                  {/* EMI */}
                  <div className="border rounded-lg p-4 flex justify-between items-center text-gray-400">
                    <p className="font-medium">EMI</p>
                    <span className="text-sm">Unavailable</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Section - Price Details */}
            <div>
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Price (1 item)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Price (1 item)</span>
                    <span>₹{totalPayable}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payment Handling Fee</span>
                    <span>₹00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Platform Fee</span>
                    <span>₹00</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base border-t pt-2">
                    <span>Total Amount</span>
                    <span>₹{totalPayable}</span>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
                    0% instant discount – Claim now with payment offers
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-gray-700">
                    Due to handling costs, a nominal fee of ₹9 will be charged
                    for orders placed using this option. Avoid this fee by
                    paying online now.
                  </div>

                  <Button
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded"
                    onClick={handleCreateOrder}
                  >
                    Place Order
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
      <MinFooter />
    </div>
  );
}
