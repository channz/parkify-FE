import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import DetailCard2 from "@/components/detail-card2";
import { useEffect, useState } from "react";
import { getTransaction } from "@/utils/apis/transaction/api";
import { Transaction } from "@/utils/apis/transaction/type";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const DetailPayment = () => {
  const [data, setData] = useState<Transaction>();
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getTransaction(params.transactionID!);
      setData(result.data);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  return (
    <Layout>
      <div className="h-2/5 bg-gradient-to-b from-orange-400 to-yellow-400 w-full">
        <div className="flex flex-col p-4 space-y-4">
          <p className="font-semibold text-3xl text-white">Detail Payment</p>
          <DetailCard2
            key={data?.transaction_id}
            location_name={data?.location!}
            cover_image={data?.image_loc!}
            city={data?.city!}
            floor={data?.floor!}
            slot={data?.slot!}
          />
          <Card className="flex rounded-3xl">
            <CardContent className="px-4 py-4 space-y-4">
              <div className="flex flex-col pb-2">
                <p className="font-semibold text-3xl">Total Payment</p>
                <p className="font-semibold text-2xl">
                  Rp {data?.price.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-normal text-base">Payment Method : </p>
                <p className="font-medium text-lg">{data?.payment_method}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-normal text-base">Virtual Account: </p>
                <p className="font-medium text-lg">{data?.virtual_account}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DetailPayment;
