import BoxHeader from "@/components/BoxHeader";
import DashBoardBox from "@/components/DashBoardBox";
import { useGetKpiQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {};

const Row1 = (props: Props) => {
  const { palette } = useTheme();
  const { data } = useGetKpiQuery();
  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]);
  return (
    <>
      <DashBoardBox gridArea="a">
        <BoxHeader
        title="Revenue and Expenses"
        subtitle= "top line represents revenus, bottom line represents "
        sideText="+4%"
        /> 
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"
                    stopColor= { palette.primary[300] }
                    stopOpacity={0.5}
                  />
                  <stop
                  offset="95%"
                  stopColor={ palette.primary[300]}
                  stopOpacity={0}
                  />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"
                    stopColor= { palette.primary[300] }
                    stopOpacity={0.5}
                  />
                  <stop
                  offset="95%"
                  stopColor={ palette.primary[300]}
                  stopOpacity={0}
                  />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px"}} />
            <YAxis 
            tickLine={false}
            axisLine = {{ strokeWidth: "0"}}
            style={{ fontSize: "10px"}}
            domain={[8000,23000]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              dot = {true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              dot = {true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashBoardBox>
      <DashBoardBox gridArea="b"></DashBoardBox>
      <DashBoardBox gridArea="c"></DashBoardBox>
    </>
  );
};

export default Row1;
