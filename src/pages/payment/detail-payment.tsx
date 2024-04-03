import ButtonSubmit from "@/components/button-submit";
import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DetailCard2 from "@/components/detail-card2";

const DetailPayment = () => {
  return (
    <Layout>
      <div className="h-2/5 bg-gradient-to-b from-orange-400 to-yellow-400 relative w-full">
        <div className="flex flex-col p-4 space-y-4">
        <DetailCard2 
            key={1}
            location_name={"Tunjungan Plaza"}
            cover_image={"/public/tunjungan-plaza.jpg"}
            city={"Surabaya"}
            floor="1st Floor"
          />
          <Card className="flex rounded-3xl">
            <CardContent className="px-4 py-5 m-auto space-y-4">
              <Separator />
              <div className="flex gap-4 items-start justify-normal px-2 pt-3 pb-3 mt-2 w-full">
                <div className="flex flex-col">
                  <p className="font-semibold text-3xl">Total Payment</p>
                  <p className="font-medium text-base">Rp 25.000</p>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col w-auto">
                <div className="flex flex-row space-x-5">
                  <p className="font-normal text-base">Payment Method: </p>
                  <p className="font-medium text-base"> Virtual Account</p>
                </div>
                <div className="flex flex-row space-x-5">
                  <p className="font-normal text-base">VA Number: </p>
                  <p className="font-medium text-base"> 8806 08123456789</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex w-full h-14">
            <ButtonSubmit button_value="Payment" button_icon="" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailPayment;
