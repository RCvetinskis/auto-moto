import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getCarById,
  getOtherSellerPosts,
  getRecommendedPosts,
} from "@/lib/car-service";
import { redirect } from "next/navigation";
import ImagesPreview from "./_components/images-preview";
import Contacts from "./_components/contacts/contacts";
import {
  CalendarCheck2,
  Car,
  Cog,
  Fuel,
  MapPin,
  Milestone,
} from "lucide-react";
import { CustomSeparator } from "@/components/ui/custom-separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import RecommendedPosts from "@/components/posts/recommended-posts";

type Props = {
  params: { postId: string };
};

function objectToArray(options: any) {
  return Object.entries(options)
    .filter(([key]) => key !== "id" && key !== "carId")
    .map(([option]) => option);
}

const Page = async ({ params }: Props) => {
  const currentCar = await getCarById(params.postId);

  if (!currentCar) return redirect("/");

  const otherSellerPosts = await getOtherSellerPosts(
    currentCar.userId,
    params.postId
  );

  const recommendPosts = await getRecommendedPosts(
    currentCar.brand,
    currentCar.model,
    params.postId
  );

  return (
    <Card className="rounded shadow shadow-black ">
      <CardContent>
        <div className="p-2">
          <ImagesPreview images={currentCar.images} />
        </div>

        <main className="max-w-[1200px] space-y-6 ">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              <span> {currentCar.brand}</span>
              <span> {currentCar.model}</span>
            </CardTitle>
            <CardDescription className="flex gap-2 text-lg font-bold text-neutral-950">
              <span>{currentCar.year} Year</span>
              <span>{currentCar.price} $</span>
            </CardDescription>
          </CardHeader>

          <div>
            <Contacts phoneNo={currentCar.phone} userId={currentCar.userId} />
          </div>

          <div className="grid grid-cols-3 gap-3 ">
            <div className="flex gap-2">
              <CalendarCheck2 size={34} />
              <div>
                <p>Year</p>
                <p className="font-bold text-sm">
                  {currentCar.year} - <span>{currentCar.month}</span>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Fuel size={34} />
              <div>
                <p>Fuel Type</p>
                <p className="font-bold text-sm capitalize">
                  {currentCar.fuel}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Milestone size={34} />
              <div>
                <p>Mileage </p>
                <p className="font-bold text-sm capitalize">
                  {currentCar.mileage}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Cog size={34} />
              <div>
                <p>Gear Box </p>
                <p className="font-bold text-sm capitalize">
                  {currentCar.gearbox}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Car size={34} />
              <div>
                <p>Engine </p>
                <p className="font-bold text-sm capitalize">
                  {currentCar.engine}l <span>{currentCar.kW}kW</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={34} />
              <div>
                <p className="font-bold text-sm capitalize">
                  {currentCar.country} <span>{currentCar.city}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div className="flex items-center justify-between capitalize">
              <p>Body Type</p>
              <p className="font-bold">{currentCar.body}</p>
            </div>
            <div className="flex items-center justify-between capitalize">
              <p>Defects</p>
              <p className="font-bold">{currentCar.defects}</p>
            </div>
            <div className="flex items-center justify-between capitalize">
              <p>Drive Type</p>
              <p className="font-bold">
                {currentCar.drive ? currentCar.drive : "-"}
              </p>
            </div>
            <div className="flex items-center justify-between capitalize">
              <p>Wheel Side</p>
              <p className="font-bold">
                {currentCar.wheelSide ? currentCar.wheelSide : "-"}
              </p>
            </div>
            <div className="flex items-center justify-between capitalize">
              <p>Doors</p>
              <p className="font-bold">{currentCar.doors}</p>
            </div>
            <div className="flex items-center justify-between capitalize">
              <p>TS/TA</p>
              <p className="font-bold">
                {currentCar.TA_year
                  ? `${currentCar.TA_year}/${currentCar.TA_month}`
                  : "-"}
              </p>
            </div>
            <div className="flex items-center justify-between capitalize">
              <p>VIN Code</p>
              <p className="font-bold">
                {currentCar.VIN ? currentCar.VIN : "-"}
              </p>
            </div>
            <div className="flex items-center justify-between capitalize">
              <p>Engine Modification</p>
              <p className="font-bold">
                {currentCar.engine_modification
                  ? currentCar.engine_modification
                  : "-"}
              </p>
            </div>
            <div className="flex items-center justify-between capitalize">
              <p>Gears</p>
              <p className="font-bold">
                {currentCar.gears ? currentCar.gears : "-"}
              </p>
            </div>
            <div className="flex items-center justify-between capitalize">
              <p>Cilinders</p>
              <p className="font-bold">
                {currentCar.cilinders ? currentCar.cilinders : "-"}
              </p>
            </div>
            <div className="flex items-center justify-between capitalize">
              <p>Wheel Size</p>
              <p className="font-bold">
                {currentCar.wheelSize ? currentCar.wheelSize : "-"}
              </p>
            </div>
            <div className="flex items-center justify-between capitalize">
              <p>Weight</p>
              <p className="font-bold">
                {currentCar.weight ? currentCar.weight : "-"}kg
              </p>
            </div>
          </div>

          <CustomSeparator text="Features" />

          {currentCar.interiorOptions && (
            <div>
              <h3 className="text-lg font-bold">Interior</h3>
              <div className="grid  grid-cols-2 md:grid-cols-3 gap-3">
                {objectToArray(currentCar.interiorOptions).map(
                  (option, index) => (
                    <Badge
                      variant={"outline"}
                      className=" p-2 overflow-hidden capitalize"
                      key={index}
                    >
                      {option}
                    </Badge>
                  )
                )}
              </div>
            </div>
          )}
          {currentCar.exteriorOptions && (
            <div>
              <h3 className="text-lg font-bold">Exterior</h3>
              <div className="grid  grid-cols-2 md:grid-cols-3 gap-3">
                {objectToArray(currentCar.exteriorOptions).map(
                  (option, index) => (
                    <Badge
                      variant={"outline"}
                      className=" p-2 overflow-hidden capitalize"
                      key={index}
                    >
                      {option}
                    </Badge>
                  )
                )}
              </div>
            </div>
          )}
          {currentCar.electronicOptions && (
            <div>
              <h3 className="text-lg font-bold">Electronics</h3>
              <div className="grid  grid-cols-2 md:grid-cols-3 gap-3">
                {objectToArray(currentCar.electronicOptions).map(
                  (option, index) => (
                    <Badge
                      variant={"outline"}
                      className=" p-2 overflow-hidden capitalize"
                      key={index}
                    >
                      {option}
                    </Badge>
                  )
                )}
              </div>
            </div>
          )}
          {currentCar.safetySecurityOptions && (
            <div>
              <h3 className="text-lg font-bold">Safety and Security</h3>
              <div className="grid  grid-cols-2 md:grid-cols-3 gap-3">
                {objectToArray(currentCar.safetySecurityOptions).map(
                  (option, index) => (
                    <Badge
                      variant={"outline"}
                      className=" p-2 overflow-hidden capitalize"
                      key={index}
                    >
                      {option}
                    </Badge>
                  )
                )}
              </div>
            </div>
          )}
          {currentCar.audioVideoOptions && (
            <div>
              <h3 className="text-lg font-bold">Audio and Video</h3>
              <div className="grid  grid-cols-2 md:grid-cols-3 gap-3">
                {objectToArray(currentCar.audioVideoOptions).map(
                  (option, index) => (
                    <Badge
                      variant={"outline"}
                      className=" p-2 overflow-hidden capitalize"
                      key={index}
                    >
                      {option}
                    </Badge>
                  )
                )}
              </div>
            </div>
          )}
          {currentCar.otherOptions && (
            <div>
              <h3 className="text-lg font-bold">Other</h3>
              <div className="grid  grid-cols-2 md:grid-cols-3 gap-3">
                {objectToArray(currentCar.otherOptions).map((option, index) => (
                  <Badge
                    variant={"outline"}
                    className=" p-2 overflow-hidden capitalize"
                    key={index}
                  >
                    {option}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {currentCar.comment && (
            <div>
              <CustomSeparator text="Comments" />

              <Textarea
                readOnly
                className="capitalize w-full outline-none min-h-[100px] max-h-[250px] mt-3 resize-none"
                defaultValue={currentCar.comment}
              />
            </div>
          )}
          <div className="space-y-3">
            <CustomSeparator text="Seller Contacts" />
            <Contacts phoneNo={currentCar.phone} userId={currentCar.userId} />
          </div>

          {otherSellerPosts.length !== 0 && (
            <div>
              <CustomSeparator text="Other Seller Posts" />
              <RecommendedPosts posts={otherSellerPosts} />
            </div>
          )}
          {recommendPosts.length !== 0 && (
            <div>
              <CustomSeparator text="Recommended Posts" />
              <RecommendedPosts posts={recommendPosts} />
            </div>
          )}
        </main>
      </CardContent>
    </Card>
  );
};

export default Page;
