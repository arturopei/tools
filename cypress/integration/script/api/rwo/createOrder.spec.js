/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {

  })

  it('Create an Order', () => {

    cy.request({
      method: 'POST',
      url: '/aftersales/api/token',
      form:false,
      headers: {
        "Content-Type":"application/json"
            },
      body: {"username":"d8ASSAjunhr",
        "password":"789@Test",
        "client_type":"tablet",
        "BSSID":"WqIgjW1+jWvUu8rB0ip1Cq1/7geDz1PJ",
        "tablet_id":"c88a21df9e71ff54"}
    }).its('body')
        .as('tokenResBody')
        .then(function(){
          //生成空订单
              cy.request({
                method: 'POST',
                url: '/aftersales/tablet/orders',
                form:false,
                headers: {
                  "Content-Type":"application/json",
                  "authorization":"Bearer "+this.tokenResBody.jwt_token
            },
          body:
                  {"carPlateNumber":"桂A12345",
                      "vin":"",
                      "vehicleInfo":
                    {"id":"9675004",
                        "dealerId":"d853b1313a",
                        "carPlateNumber":"桂A12345",
                        "mileage":1024,
                        "insuranceCompanyName":"",
                        "vehicleProd":
                          {"id":"460538",
                              "fin":"WDC2511631E016387",
                              "vin":"WDCCB6DE6HE016387",
                              "engineNumber":"27682630544185",
                              "brand":"MB-PKW",
                              "model":"R 320 CGI 4MATIC L",
                              "modelLongName":"R320",
                              "modelVariant":"2511631-CN6",
                              "classLevel":"R",
                              "descriptionCn":"梅赛德斯-奔驰 R 320 豪华型",
                              "descriptionEn":"R 320 Luxury",
                              "evaFirstRegistrationDate":"2017-04-02T00:00:00.000Z",
                              "trim":"白兰地褐色真皮",
                              "trimCode":"227",
                              "paint":"曜岩黑",
                              "paintCode":"197",
                              "warranty3RValidity":true,
                              "warranty3RValidityReason":"1",
                              "modelYear":"808",
                              "modelLongNameBasedOnModelVariant":"R320",
                              "nextServiceDate":"2021-11-06T03:32:33.000Z",
                              "nextServiceMileage":22122,
                              "lastServiceHistoryId":"5fc8d5862bb33d0006506f34",
                              "saleCountry":"CHINA VOLKSREPUBLIK",
                              "vehicleBusinessType":"PC"},
                      "firstRegistrationDate":"2019-04-10T12:00:00.000Z",
                        "warrantyExpirationDate":"2020-04-02T00:00:00.000Z",
                        "annualCheckDate":"2025-04-30T00:00:00.000Z",
                        "mileageTimestamp":"2021-01-05T09:13:43.000Z",
                        "vehicleAffiliationType":1,
                        "toUseGuaranteeStartDateReplaceFrd":false},
                    "category":"AFTERSALES"}

            }).should((response) => {
                expect(response.status).to.eq(201)
          })
          //个人车主
          cy.request({
                method: 'POST',
                url: '/aftersales/tablet/vehicle-customers',
                form:false,
                headers: {
                  "Content-Type":"application/json",
                  "authorization":"Bearer "+this.tokenResBody.jwt_token,
                  "operationType":"add"
            },
          body:
              {"vehicleId":"460538","contactsId":"5980353e4eb4ad000b5bdbb0","contactsRole":"AFTER_SALES"}
            }).should((response) => {
                expect(response.status).to.eq(204)
          })
          //送修人
          cy.request({
                method: 'POST',
                url: '/aftersales/tablet/vehicle-customers',
                form:false,
                headers: {
                  "Content-Type":"application/json",
                  "authorization":"Bearer "+this.tokenResBody.jwt_token,
                  "operationType":"add"
            },
          body:
              {"vehicleId":"460538","ownerId":"5980353e4eb4ad000b5bdbb0"}
            }).should((response) => {
                expect(response.status).to.eq(204)
          })
          //车辆归属
            cy.request({
                method: 'PUT',
                url: '/aftersales/tablet/vehicles/460538?vehicleAffiliationType=1',
                form:false,
                headers: {
                  "Content-Type":"application/json",
                  "authorization":"Bearer "+this.tokenResBody.jwt_token,
            },
          body:
              {}
            }).should((response) => {
                expect(response.status).to.eq(204)
          })

  })
})
})
