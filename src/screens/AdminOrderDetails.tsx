import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Package, User, MapPin, CreditCard } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getOrderDetails } from "@/redux/slices/order.slice";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AdvancedImage } from "@cloudinary/react";
import { createOptimizedImage } from "@/lib/cloudinary";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOrderDetailsForAdminLoading, orderDetailsForAdmin } =
    useAppSelector((state) => state.order);

  useEffect(() => {
    if (id) dispatch(getOrderDetails(id));
  }, [id, dispatch]);

  if (isOrderDetailsForAdminLoading) return <OrderDetailsLoadingUi />;

  return (
    <>
      {orderDetailsForAdmin && (
        <div className="space-y-6 md:p-6 p-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold flex item-center gap-2">
              Order Details
            </h1>
            <Badge className="text-sm bg-green-500 hover:bg-green-600">
              {orderDetailsForAdmin.status}
            </Badge>
          </div>

          {/* Order Summary */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Package className="w-5 h-5" /> Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Order Date</p>
                <p className="font-medium flex items-center gap-1">
                  <Calendar className="w-4 h-4" />{" "}
                  {new Date(
                    orderDetailsForAdmin.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Payment Method</p>
                <p className="font-medium flex items-center gap-1">
                  <CreditCard className="w-4 h-4" />{" "}
                  {orderDetailsForAdmin.paymentMethod.toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Total Amount</p>
                <p className="font-medium">
                  ₹ {orderDetailsForAdmin.totalAmount}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Payment Status</p>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-500"
                >
                  {orderDetailsForAdmin.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Customer & Address */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card
              onClick={() =>
                navigate(`/get-user/${orderDetailsForAdmin.userId._id}`)
              }
              className="cursor-pointer"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" /> Customer Details
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p>
                  <span className="text-gray-500">Name: </span>
                  {orderDetailsForAdmin.userId.name.charAt(0).toUpperCase() +
                    orderDetailsForAdmin.userId.name.slice(1)}
                </p>
                <p>
                  <span className="text-gray-500">Email: </span>
                  {orderDetailsForAdmin.userId.email}
                </p>
                <p>
                  <span className="text-gray-500">Role: </span>
                  {orderDetailsForAdmin.userId.role}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" /> Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  {orderDetailsForAdmin.addressId.city},{" "}
                  {orderDetailsForAdmin.addressId.district}
                </p>
                <p>
                  {orderDetailsForAdmin.addressId.state}, Pin -{" "}
                  {orderDetailsForAdmin.addressId.pincode}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Ordered Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" /> Ordered Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                      Image
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                      Product
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-center">
                      Quantity
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-right">
                      Price
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {orderDetailsForAdmin.products.map((product) => (
                    <TableRow
                      key={product.productId._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/admin/product-details/${product.productId._id}`
                        )
                      }
                    >
                      <TableCell className="py-3">
                        <Avatar className="w-10 h-10 border border-gray-200 dark:border-gray-700">
                          {product.productId.images?.[0]?.url ? (
                            <AdvancedImage
                              cldImg={createOptimizedImage(
                                product.productId.images?.[0]?.url
                              )}
                              className="object-cover w-full h-full rounded-full"
                            />
                          ) : (
                            <AvatarFallback className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                              N/A
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </TableCell>

                      <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                        {product.productId.product_name}
                      </TableCell>

                      <TableCell className="text-center text-gray-700 dark:text-gray-300">
                        {product.quantity}
                      </TableCell>

                      <TableCell className="text-right font-medium text-gray-800 dark:text-gray-200">
                        ₹{product.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

                <TableFooter>
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableCell
                      colSpan={3}
                      className="font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Total
                    </TableCell>
                    <TableCell className="text-right font-semibold text-gray-900 dark:text-gray-100">
                      ₹{orderDetailsForAdmin.totalAmount}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>

          {/* Timeline / Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" /> Order Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Ordered</Badge>
                <span>8 Oct 2025, 10:45 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Shipped</Badge>
                <span>9 Oct 2025, 1:20 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Delivered</Badge>
                <span>11 Oct 2025, 3:10 PM</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Separator />
          <div className="flex justify-end gap-3">
            <Button variant="outline">Refund</Button>
            <Button>Update Status</Button>
          </div>
        </div>
      )}
    </>
  );
}

// for loading state handling
function OrderDetailsLoadingUi() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-40" /> {/* Order #123456 */}
        <Skeleton className="h-6 w-20 rounded-full" /> {/* Badge */}
      </div>

      {/* Order Summary */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Customer & Address */}
      <div className="grid md:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="h-5 w-40" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[...Array(3)].map((_, j) => (
                <Skeleton key={j} className="h-4 w-48" />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ordered Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="h-5 w-36" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-24" />
              ))}
            </div>
            {/* Table Rows */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, j) => (
                  <Skeleton key={j} className="h-4 w-24" />
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline / Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="h-5 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-4 w-48" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Actions */}
      <Separator />
      <div className="flex justify-end gap-3">
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>
    </div>
  );
}
