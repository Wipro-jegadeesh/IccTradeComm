
    let AcceptFinanceSampleResponse = {
          // [{
      //   "id": 127,
      //   "smeId": "user110",
      //   "invId": "1111",
      //   "invref": "INV202100127",
      //   "invAmt": 1000,
      //   "invCcy": "SGD",
      //   "buyerName": "gold",
      //   "invDate": "2021-06-01",
      //   "invDueDate": "2021-06-24",
      //   "buyerAddr": "AFG",
      //   "billNo": "123",
      //   "dispDate": "2021-06-10",
      //   "baseAmt": 0,
      //   "baseCcy": null,
      //   "fxRate": 0,
      //   "source": null,
      //   "smeRating": null,
      //   "transactionRating": null,
      //   "status": "APR",
      //   "smeProfileId": "SME44",
      //   "financierProfileId": null,
      //   "buyerUEN": null,
      //   "goodsDetails": [
      //       {
      //           "key97": 145,
      //           "descGoods": "giold",
      //           "quantity": 10,
      //           "quantityType": null,
      //           "rate": 100,
      //           "amtCcy": "SGD",
      //           "amt": 1000,
      //           "discAmt": 0,
      //           "netAmtPay": 1000,
      //           "taxRate": 0,
      //           "taxAmt": 0,
      //           "total": 1000
      //       }
      //   ]
      // }]
      // let resp =  [
        //   {
        //       "baseCcyDiscAmt": 13.13,
        //       "invoiceDate": "2021-05-31T18:30:00.000+0000",
        //       "baseCcyNetAmtPayable": 886.88,
        //       "fundablePercent": "90",
        //       "invoiceNo": "1111",
        //       "invoiceId": "127",
        //       "tenor": "21",
        //       "repaymentDate": "2021-06-23T18:30:00.000+0000",
        //       "annualYeild": "25",
        //       "fxRate": "1",
        //       "baseCcyFundingAmt": 900.0,
        //       "status": "FIN",
        //       "repaymentAmt": 900.00,
        //       "baseCcyAmt": "SGD",
        //       "invoiceDueDate": "2021-06-23T18:30:00.000+0000",
        //       "baseamt": 1000.00,
        //       "fin_id": "FIN202100081",
        //       "finId": "FIN202100081",
        //       "buyerName": "gold",
        //       "smeId": "user110"
        //   }
        // ]
        // this.dataSource = new MatTableDataSource([{
        //     buyerAddr: "Singapore",
        //     buyerName: "Tata Steel",
        //     dispDate: "17/03/2021",
        //     id: 2,
        //     invAmt: "10000",
        //     invCcy: "SGD",
        //     invDate: "17/03/2021",
        //     invDueDate: "17/06/2021",
        //     invId: "INV102",
        //     smeId: "SME101",
        //     status: "A"
        //   }]);



        // let obj = [
        //   {
        //     "LIMIT_PERCENT": "25",
        //     "TRANS_COUNT": 3,
        //     "sme_profile_id": "SME44"
        //   },
        //   {
        //     "TRANS_COUNT": 1,
        //     "LIMIT_PERCENT": "50",
        //     "sme_profile_id": "SME44"
        //   },
        //   {
        //     "LIMIT_PERCENT": "100",
        //     "TRANS_COUNT": 1,
        //     "sme_profile_id": "SME44"
        //   },
        //   {
        //     "TRANS_COUNT": 1,
        //     "sme_profile_id": "SME44",
        //     "LIMIT_PERCENT": "FULL"
        //   }
        // ]
        let obj = [
          {
            "LIMIT_PERCENT": "25",
            "TRANS_COUNT": 3,
            "sme_profile_id": "SME44"
          },
          {
            "TRANS_COUNT": 1,
            "LIMIT_PERCENT": "50",
            "sme_profile_id": "SME44"
          },
          {
            "LIMIT_PERCENT": "100",
            "TRANS_COUNT": 1,
            "sme_profile_id": "SME44"
          },
          {
            "TRANS_COUNT": 1,
            "sme_profile_id": "SME44",
            "LIMIT_PERCENT": "FULL"
          }
        ]


        let buyertabledenpendData = [
          {
            "sector_description": "Agriculture, Forestry, Fishing",
            "country": "Singapore",
            "smename": "jhonson ss",
            "status": "BFA",
            "bidvalue": 135.0,
            "buyeruen": "4321",
            "invoicedate": "2021-05-24T02:46:27.290+0000",
            "LIMIT_PERCENT": 6.75,
            "invoiceamount": 150.0,
            "sme_profile_id": "SME75",
            "invoice": "INV101"
          },
          {
            "sector_description": "Agriculture, Forestry, Fishing",
            "country": "Singapore",
            "sme_profile_id": "SME81",
            "status": "BFA",
            "buyeruen": "1234",
            "bidvalue": 135.0,
            "smename": "Rubin Smith asd",
            "LIMIT_PERCENT": 6.75,
            "invoice": "L2",
            "invoiceamount": 150.0,
            "invoicedate": null
          },
          {
            "sector_description": "Agriculture, Forestry, Fishing",
            "country": "Singapore",
            "smename": "jhonson ss",
            "invoiceamount": 450.0,
            "status": "BFA",
            "LIMIT_PERCENT": 20.25,
            "buyeruen": "1234",
            "sme_profile_id": "SME75",
            "invoice": "L1",
            "invoicedate": null,
            "bidvalue": 405.0
          }
        ]
        this.dataSourcebuyerExposureTable = new MatTableDataSource(buyertabledenpendData);


        let counrtytabledenpendData = [
          {
            "sector_description": "Agriculture, Forestry, Fishing",
            "country": "Singapore",
            "smename": "jhonson ss",
            "status": "BFA",
            "bidvalue": 135.0,
            "addresss": "Singapore",
            "invoicedate": "2021-05-24T02:46:27.290+0000",
            "LIMIT_PERCENT": 6.75,
            "invoiceamount": 150.0,
            "sme_profile_id": "SME75",
            "invoice": "INV101"
          },
          {
            "sector_description": "Agriculture, Forestry, Fishing",
            "country": "Singapore",
            "smename": "jhonson ss",
            "invoiceamount": 450.0,
            "status": "BFA",
            "LIMIT_PERCENT": 20.25,
            "addresss": "Singapore",
            "sme_profile_id": "SME75",
            "invoice": "L1",
            "invoicedate": null,
            "bidvalue": 405.0
          }
        ]
        this.dataSourceCountryExposureTable = new MatTableDataSource(counrtytabledenpendData);
        
      }
