import ButtonSubmit from "@/components/button-submit";
import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import QRCode from "react-qr-code";

const EntryQR = () => {
  return (
    <Layout>
      <div className="h-2/5 bg-gradient-to-b from-orange-400 to-yellow-400">
        <div className="flex flex-col p-4 space-y-5 w-full">
          <p className="font-semibold text-3xl text-white">Your Entry QR</p>
          <Card className="flex rounded-3xl">
            <CardContent className="px-4 py-5 m-auto space-y-4">
            <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={"1234567890"}
                    viewBox={`0 0 256 256`}
                />
              <p className="text-center font-light text-lg">
                Booking ID : <span>1234567890</span>
              </p>
              <Separator />
              <div className="flex">
                <div className="flex flex-col">
                  <p className="font-semibold text-3xl">1st Floor</p>
                  <p className="font-medium text-base">Floor</p>
                </div>
                <div className="flex flex-col ms-auto">
                  <p className="font-semibold text-3xl">1</p>
                  <p className="font-medium text-base">Slot</p>
                </div>
              </div>
              <Separator />
              <div className="flex">
                <div className="flex flex-col w-1/2">
                  <p className="font-normal text-base">Location</p>
                  <p className="font-semibold text-3xl text-wrap">
                    Tunjungan Plaza
                  </p>
                  <p className="font-medium text-base">Surabaya</p>
                </div>
                <div className="flex flex-col ms-auto">
                  <p className="font-normal text-base">Vehicle</p>
                  <p className="font-semibold text-3xl">Car</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex w-full h-14">
            <ButtonSubmit button_value="Exit Park" button_icon="" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EntryQR;
