/*
 * @author Biosheep
 * @suffix 所属单位信息有待补充
 *
 * @brief 基本信息模块 API
 */
import request from "../request"

export async function getSidebar(params) {
  return [{
    label: "交通警察支队",
    id: 1,
    did: "01",
    children: [{
      id: 2,
      did: "02",
      label: "办公室",
    },
    {
      id: 3,
      did: "03",
      label: "政工科",
    },
    {
      id: 4,
      did: "04",
      label: "财务科",
    },
    {
      label: "交通秩序管理科",
      id: 5,
      did: "05",
      children: [{
        id: 6,
        did: "06",
        label: "特勤中队",
      },
      {
        id: 7,
        did: "07",
        label: "交通设施股",
      },
      ],
    },
    {
      label: "事故处理大队",
      id: 8,
      did: "08"
    },
    {
      label: "车辆管理所",
      id: 9,
      did: "09",
      children: [{
        label: "政秘股",
        id: 10,
        did: "10"
      },
      {
        label: "车辆管理股",
        id: 11,
        did: "11"
      },
      {
        label: "驾驶员管理",
        id: 12,
        did: "12",
      },
      {
        label: "证照股",
        id: 13,
        did: "13"
      },
      {
        label: "档案管理股",
        id: 14,
        did: "14"
      },
      {
        label: "考试股",
        id: 15,
        did: "15"
      },
      ]
    },
    {
      label: "直属大队",
      id: 16,
      did: "16",
      children: [{
        label: "政秘股",
        id: 17,
        did: "17",
      },
      {
        label: "秩序股",
        id: 18,
        did: "18"
      },
      {
        label: "事故处理股",
        id: 19,
        did: "19"
      },
      {
        label: "一中队",
        id: 20,
        did: "20",
      },
      {
        label: "二中队",
        id: 21,
        did: "21"
      },
      {
        label: "三中队",
        id: 22,
        did: "22",
      },
      {
        label: "四中队",
        id: 23,
        did: "23"
      }
      ]
    },
    {
      label: "安源大队",
      id: 24,
      did: "24",
      children: [{
        label: "政秘股",
        id: 25,
        did: "25",
      },
      {
        label: "车管股",
        id: 26,
        did: "26"
      },
      {
        label: "秩序股",
        id: 27,
        did: "27"
      },
      {
        label: "高坑中队",
        id: 28,
        did: "28"
      },
      {
        label: "青山中队",
        id: 29,
        did: "29"
      },
      {
        label: "事故处理股",
        id: 30,
        did: "30"
      },
      {
        label: "安源中队",
        id: 31,
        did: "31"
      },
      {
        label: "五陂中队",
        id: 32,
        did: "32"
      },
      ]
    },
    {
      label: "湘东大队",
      id: 33,
      did: "33",
      children: [{
        label: "政秘股",
        id: 34,
        did: "34"
      },
      {
        label: "车管股",
        id: 35,
        did: "35"
      },
      {
        label: "秩序股",
        id: 36,
        did: "36"
      },
      {
        label: "事故处理股",
        id: 37,
        did: "37"
      },
      {
        label: "老关中队",
        id: 38,
        did: "38"
      },
      {
        label: "麻山中队",
        id: 39,
        did: "39"
      },
      {
        label: "城区中队",
        id: 40,
        did: "40"
      },
      {
        label: "排上中队",
        id: 41,
        did: "41"
      },
      {
        label: "白竺中队",
        id: 42,
        did: "42"
      }
      ]
    },
    {
      label: "开发大队",
      id: 43,
      did: "43",
      children: [{
        label: "政秘股",
        id: 44,
        did: 44
      },
      {
        label: "秩序股",
        id: 45,
        did: "45"
      },
      {
        label: "事故处理股",
        id: 46,
        did: "46"
      },
      {
        label: "一中队",
        id: 47,
        did: "47"
      },
      {
        label: "二中队",
        id: 48,
        did: "48"
      },
      {
        label: "车管股",
        id: 49,
        did: "49"
      },
      {
        label: "三中队",
        id: 50,
        did: "50"
      },
      {
        label: "四中队",
        id: 51,
        did: "51"
      },
      {
        label: "五中队",
        id: 52,
        did: "52"
      }
      ]
    },
    {
      label: "科技科",
      id: 53,
      did: "53",
      children: [{
        label: "信息集数股",
        id: 54,
        did: "54"
      },
      {
        label: "交通监控股",
        id: 55,
        did: "55"
      }
      ]
    },
    {
      label: "法制科",
      id: 56,
      did: "56",
      children: [{
        label: "法制股",
        id: 57,
        did: "57"
      },
      {
        label: "宣传股",
        id: 58,
        did: "58"
      }
      ]
    },
    {
      label: "武功山大队",
      id: 59,
      did: "59",
    },
    {
      label: "指挥中心",
      id: 60,
      did: "60"
    },
    ],
  },];
}
export function getPoliceInfoById(id) {
  return request({
    url: "/basicInfo/get/?id=" + id,
    method: "get",
  })
}
export function updateBasicInfo(params) {
  return request({
    url: "/basicInfo/update",
    method: "post",
    data: params
  })
}


