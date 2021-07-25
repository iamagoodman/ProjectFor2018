[
  {
    "code": "insurance_compensate",
    "id": 55062,
    "description": "",
    "level": 1,
    "menu": true,
    "moduleType": 2,
    "name": "理赔管理",
    "parentId": 0,
    "position": null,
    "visible": false,
    "status": 1,
    "url": "https://oper.tongbb.net/insurance/compensate",
    "resourceBos": [
      {
        "code": "insurance_compensate_approval",
        "id": 55063,
        "description": "",
        "level": 2,
        "menu": true,
        "moduleType": 1,
        "name": "理赔审核",
        "parentId": 55062,
        "position": null,
        "visible": false,
        "status": 1,
        "url": "https://oper.tongbb.net/insurance/compensate/approval",
        "resourceBos": [
          {
            "code": "insurance_compensate_task_list",
            "id": 55066,
            "description": "",
            "level": 3,
            "menu": false,
            "moduleType": 0,
            "name": "理赔列表",
            "parentId": 55063,
            "position": null,
            "visible": false,
            "status": 1,
            "url": "https://oper.tongbb.net/policy/claim/task/list",
            "resourceBos": []
          },
          {
            "code": "insurance_compensate_get_task",
            "id": 55067,
            "description": "",
            "level": 3,
            "menu": false,
            "moduleType": 0,
            "name": "领取任务",
            "parentId": 55063,
            "position": null,
            "visible": false,
            "status": 1,
            "url": "https://oper.tongbb.net/policy/claim/get/task",
            "resourceBos": []
          },
          {
            "code": "insurance_compensate_commit",
            "id": 55068,
            "description": "",
            "level": 3,
            "menu": false,
            "moduleType": 0,
            "name": "理赔审核提交",
            "parentId": 55063,
            "position": null,
            "visible": false,
            "status": 1,
            "url": "https://oper.tongbb.net/policy/claim/commit",
            "resourceBos": []
          }
        ]
      },
      {
        "code": "insurance_compensate_query",
        "id": 55064,
        "description": "",
        "level": 2,
        "menu": true,
        "moduleType": 1,
        "name": "理赔查询",
        "parentId": 55062,
        "position": null,
        "visible": false,
        "status": 1,
        "url": "https://oper.tongbb.net/insurance/compensate/query",
        "resourceBos": [
          {
            "code": "insurance_compensate_query_list",
            "id": 55069,
            "description": "",
            "level": 3,
            "menu": false,
            "moduleType": 0,
            "name": "理赔查询列表",
            "parentId": 55064,
            "position": null,
            "visible": false,
            "status": 1,
            "url": "https://oper.tongbb.net/policy/claim/query/list",
            "resourceBos": []
          },
          {
            "code": "media_download_stream",
            "id": 55071,
            "description": "",
            "level": 3,
            "menu": false,
            "moduleType": 0,
            "name": "下载图片流",
            "parentId": 55064,
            "position": null,
            "visible": false,
            "status": 1,
            "url": "https://oper.tongbb.net/media/download/stream",
            "resourceBos": []
          }
        ]
      },
      {
        "code": "insurance_compensate_approval_page",
        "id": 55077,
        "description": "",
        "level": 2,
        "menu": false,
        "moduleType": 1,
        "name": "理赔详情处理",
        "parentId": 55062,
        "position": null,
        "visible": false,
        "status": 1,
        "url": "https://oper.tongbb.net/insurance/compensate/approvalPage",
        "resourceBos": [
          {
            "code": "policy_claim_query_detail",
            "id": 55078,
            "description": "",
            "level": 3,
            "menu": false,
            "moduleType": 0,
            "name": "理赔详情接口",
            "parentId": 55077,
            "position": null,
            "visible": false,
            "status": 1,
            "url": "https://oper.tongbb.net/policy/claim/query/detail",
            "resourceBos": []
          }
        ]
      }
    ]
  }
]
