import type { NextPage } from "next";
import Head from "next/head";
const { RestClient } = require("ftx-api");
import moment from "moment";
import { useEffect, useState } from "react";
import { LineChart, Line } from "recharts";
import TonLogo from "../assets/tonLogo";

import { useTonhubConnect } from "react-ton-x";

const Home: NextPage = (props: any) => {
  const [range, setRange] = useState("1m"); // 1m, 7d, 6m
  const [rangeValues, setRangeValues] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(0);

  const connect = useTonhubConnect();

  useEffect(() => {
    switch (range) {
      case "7d":
        setRangeValues(props.sevenDaysAgo);
        setStartDate(props.sevenDaysAgo[0].startTime);
        setEndDate(props.sevenDaysAgo[props.sevenDaysAgo.length - 1].startTime);
        setStartPrice(props.sevenDaysAgo[0].close);
        setEndPrice(props.sevenDaysAgo[props.sevenDaysAgo.length - 1].close);
        break;
      case "1m":
        setRangeValues(props.oneMonthAgo);
        setStartDate(props.oneMonthAgo[0].startTime);
        setEndDate(props.oneMonthAgo[props.oneMonthAgo.length - 1].startTime);
        setStartPrice(props.oneMonthAgo[0].close);
        setEndPrice(props.oneMonthAgo[props.oneMonthAgo.length - 1].close);
        break;
      case "6m":
        setRangeValues(props.sixMonthsAgo);
        setStartDate(props.sixMonthsAgo[0].startTime);
        setEndDate(props.sixMonthsAgo[props.sixMonthsAgo.length - 1].startTime);
        setStartPrice(props.sixMonthsAgo[0].close);
        setEndPrice(props.sixMonthsAgo[props.sixMonthsAgo.length - 1].close);
        break;
      default:
        setRangeValues(props.oneMonthAgo);
        setStartDate(props.oneMonthAgo[0].startTime);
        setEndDate(props.oneMonthAgo[props.oneMonthAgo.length - 1].startTime);
        setStartPrice(props.oneMonthAgo[0].close);
        setEndPrice(props.oneMonthAgo[props.oneMonthAgo.length - 1].close);
        break;
    }
  }, [range]);

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div>
      <Head>
        <title>TON Price History</title>
        <meta
          name="description"
          content="Showing the history of TON coin price for 7 days, 1 month and 6 months"
        />
        <meta name="theme-color" content="#fff" />
        <meta name="application-name" content="Ton Price History" />
        <meta
          name="ton-x-image"
          content="https://tonhub-price-history-extension.vercel.app/ton_symbol_310.png"
        />
        <meta
          property="og:logo"
          content="https://tonhub-price-history-extension.vercel.app/ton_symbol_310.png"
        />
        <meta
          // @ts-ignore
          itemprop="og:logo"
          content="https://tonhub-price-history-extension.vercel.app/ton_symbol_310.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen w-[90%] mx-auto overflow-hidden">
        <div className="flex flex-col items-center mt-10">
          <TonLogo></TonLogo>
          <LineChart
            width={400}
            height={100}
            data={rangeValues}
            className="mt-16"
          >
            <Line
              type="monotone"
              dataKey="close"
              stroke="#45a8f1"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </div>
        <div className="flex flex-row w-full justify-between">
          <div className="text-center">
            <p className="text-ton-blue text-lg font-bold">
              ${startPrice.toFixed(2)}
            </p>
            <p className="text-ton-blue-dark text-base">
              {moment(startDate).format("MMM D")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-ton-blue text-lg font-bold">
              ${endPrice.toFixed(2)}
            </p>
            <p className="text-ton-blue-dark text-base">
              {moment(endDate).format("MMM D")}
            </p>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between mt-10">
          <button
            className="border-ton-blue border-2 flex-1 rounded-lg px-2 mx-1 py-5"
            onClick={() => setRange("7d")}
          >
            7 days
          </button>
          <button
            className="border-ton-blue border-2 flex-1 rounded-lg px-2 mx-1 py-5"
            onClick={() => setRange("1m")}
          >
            1 month
          </button>
          <button
            className="border-ton-blue border-2 flex-1 rounded-lg px-2 mx-1 py-5"
            onClick={() => setRange("6m")}
          >
            6 months
          </button>
        </div>
        <div className="flex flex-col w-full mt-10">
          <h1 className="text-lg font-bold">Is this just a dummy extension?</h1>
          <p className="text-base font-light mt-1">
            No, it is not. I will develop new features of this demo. Furthermore
            - I&apos;m learning TON FunC smartcontracts programming.
          </p>
          <p className="text-base font-light mt-1">
            Please, support my efforts on making TON ecosystem better. You can
            click button bellow and send me some TONs.
          </p>
          <button
            onClick={() => {
              connect.api.requestTransaction({
                to: "EQC7zjln0_fghMQg0A-ZhYFar3DU1bDW9A4Vi5Go5uu-tAHe",
                value: "10000000000",
              });
            }}
            className="border-ton-blue-dark border-2 flex-1 rounded-lg px-2 py-2 my-5"
          >
            Donate
          </button>

          <p className="w-full text-center text-lg font-light">
            Thank you! 💎💎💎
          </p>
          <p className="w-full text-center text-lg font-light text-ton-blue mt-5">
            My <a href="https://t.me/cryptodevpath">Telegram channel</a>
          </p>
          <p className="w-full text-center text-lg font-light text-red mt-0.5">
            My{" "}
            <a href="https://www.youtube.com/channel/UCCjQm86C0laZOk7eGLxmY0w">
              YouTube channel
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const now = moment();
  const sevenDaysAgo = moment().subtract(7, "days");
  const oneMonthAgo = moment().subtract(1, "month");
  const sixMonthsAgo = moment().subtract(6, "months");

  const API_KEY = process.env.API_KEY;
  const PRIVATE_KEY = process.env.PRIVATE_KEY;

  const ftxClient = new RestClient(API_KEY, PRIVATE_KEY);

  const sevenDaysAgoPromise = new Promise((resolve, reject) => {
    ftxClient
      .getHistoricalPrices({
        market_name: "TONCOIN/USD",
        resolution: 14400,
        start_time: sevenDaysAgo.unix(),
        end_time: now.unix(),
      })
      .then((res: any) => {
        resolve(res.result);
      });
  });

  const oneMonthAgoPromise = new Promise((resolve, reject) => {
    ftxClient
      .getHistoricalPrices({
        market_name: "TONCOIN/USD",
        resolution: 86400,
        start_time: oneMonthAgo.unix(),
        end_time: now.unix(),
      })
      .then((res: any) => {
        resolve(res.result);
      });
  });

  const sixMonthsAgoPromise = new Promise((resolve, reject) => {
    ftxClient
      .getHistoricalPrices({
        market_name: "TONCOIN/USD",
        resolution: 86400 * 7,
        start_time: sixMonthsAgo.unix(),
        end_time: now.unix(),
      })
      .then((res: any) => {
        resolve(res.result);
      });
  });

  const allData = await Promise.all([
    sevenDaysAgoPromise,
    oneMonthAgoPromise,
    sixMonthsAgoPromise,
  ]);

  return {
    props: {
      sevenDaysAgo: allData[0],
      oneMonthAgo: allData[1],
      sixMonthsAgo: allData[2],
    },
  };
}
