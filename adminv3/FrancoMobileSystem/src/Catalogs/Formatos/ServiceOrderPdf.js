import {
  Page,
  Document,
  View,
  Text,
  Image,
  StyleSheet
} from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { FormatCurrency } from 'utils/FormatData';
import CustomTablePDF from './_TablePDF';
const BORDER_COLOR = '#000';
const BORDER_STYLE = 'solid';
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  headerDiv: {
    'text-align': 'center!important',
    'margin-bottom': '1rem!important',
    display: 'flex',
    'flex-wrap': 'wrap'
  },
  logoheader: {
    'text-align': 'left!important',
    flex: '0 0 auto',
    width: '16.66666667%'
  },
  textHeader: {
    'font-size': '.8333333333rem!important'
  },
  em: {
    fontStyle: 'bold'
  },
  cell: {
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    flexWrap: 'wrap'
  },
  headerBg: {
    backgroundColor: '#aaa'
  },
  table: {
    display: 'table',
    width: '50%',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1
    // borderRightWidth: 0,
    // borderBottomWidth: 0,
  },
  tableRow: {
    margin: '1px',
    flexDirection: 'row'
  },

  tableCellHeader: {
    margin: 1,
    fontSize: 11,
    fontWeight: 'bold'
    // fontFamily: "CustomRoboto",
  },
  tableCell: {
    margin: 1,
    fontSize: 10
    // fontFamily: "CustomRoboto",
  },
  textCenter: {
    textAlign: 'center'
  }
});
const fieldsParts = [
  {
    title: 'Part Descr.',
    custom: true,
    style: { textAlign: 'left', fontSize: '8px' },
    className: 'text-left',
    component: item => `${item.description}`,
    width: '45'
  },
  {
    title: ' Qty',
    custom: true,
    style: { textAlign: 'center', fontSize: '8px' },
    className: 'text-center',
    component: item => `${item.quantity}`,
    width: '20'
  },
  {
    title: ' Price',
    style: { textAlign: 'right', fontSize: '8px' },
    className: 'text-right',
    component: item => `${item.price}`,
    width: '20'
  },
  {
    title: 'Amount',
    custom: true,
    style: { textAlign: 'right', fontSize: '8px' },
    className: 'text-right',
    component: item => `${item.quantity * item.price}`,
    width: '15'
  }
];

const fieldsFailures = [
  {
    title: 'Labor Description',
    custom: true,
    style: { textAlign: 'left', fontSize: '8px' },
    className: 'text-left',
    component: item => `${item.description}`,
    width: '45'
  },
  {
    title: 'Price',
    style: { textAlign: 'right', fontSize: '8px' },
    className: 'text-right',
    component: item => `${item.price}`,
    width: '20'
  }
];

let tableCol = {
  borderStyle: 'solid',
  borderColor: '#000',
  borderBottomColor: '#000',
  borderWidth: 1,
  borderLeftWidth: 0,
  borderTopWidth: 0
};

const Br = () => '\n';
// Create Document Component
const ORderPdf = ({ parts, service, failures }) => {
  const serviceParts = parts
    .filter(item => item.chargetocustomer)
    .map(part => {
      return {
        description: part.part.description,
        partcode: part.part.partcode,
        quantity: 1,
        price: part.part.price,
        amount: part.part.price
      };
    });
  const serviceFailures = failures
    .filter(
      item =>
        item.idcommonfailurestatus === 1 || item.idcommonfailurestatus === 2
    )
    .map(failure => {
      return {
        description: failure.commonfailure.shortdescription,
        price: failure.commonfailure.price,
        comments: failure.comments
      };
    });

  return (
    <Document>
      <Page size="A4">
        <View style={{ padding: '15px' }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Image
                style={{ width: '100px' }}
                source="/css/falcon.png"
                //assets/img/illustrations/falcon.png
              />
            </View>
            <View style={{ flex: 2 }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Text style={{ textAlign: 'center', fontSize: '12px' }}>
                  SHOP: 425 TAFT HWY / <Br /> MAIL: 825 TAFT HWY
                  <Br /> Bakersfield, CA. 93307
                  <Br /> Phone: 661-377-4222 Fax: -aaaa -
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: 'center', fontSize: '12px' }}>
                ESTIMATE
                <Br /> 7777444
              </Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ flex: 2 }}>
              <Text style={{ textAlign: 'left', fontSize: '12px' }}>
                Invoice to
              </Text>
              <Text style={{ textAlign: 'left', fontSize: '10px' }}>
                {service.customer.company}
                <Br /> {service.customer.address}
                <Br /> {service.customer.city}, {service.customer.state}
                <Br /> {service.customer.email}
                <Br /> {service.customer.phone}
              </Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={{ textAlign: 'left', fontSize: '12px' }}>
                Orde1r #COT-{String('0000000' + service.idService).slice(-7)}{' '}
              </Text>
              <Text style={{ textAlign: 'left', fontSize: '10px' }}>
                {service.vehicle.year}-{service.vehicle.make}-
                {service.vehicle.model}
                <Br />
                Lic #: {service.vehicle.license}
                <Br />
                Odometer In: 5
                <Br />
                Unit #: {service.vehicle.unit}
                <Br />
                Vin #: {service.vehicle.vin}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View
              style={{
                display: 'table',
                width: '65%',
                borderStyle: BORDER_STYLE,
                borderColor: BORDER_COLOR,
                borderWidth: 1
              }}
            >
              <View style={[styles.tableRow, styles.headerBg]}>
                <View key="head1" style={[tableCol, { width: '50%' }]}>
                  <Text style={[styles.tableCellHeader, { textAlign: 'left' }]}>
                    Part Descr.
                  </Text>
                </View>
                <View key="head2" style={[tableCol, { width: '10%' }]}>
                  <Text
                    style={[styles.tableCellHeader, { textAlign: 'center' }]}
                  >
                    Qty
                  </Text>
                </View>
                <View key="head3" style={[tableCol, { width: '20%' }]}>
                  <Text
                    style={[styles.tableCellHeader, { textAlign: 'center' }]}
                  >
                    Price
                  </Text>
                </View>
                <View key="head4" style={[tableCol, { width: '20%' }]}>
                  <Text
                    style={[styles.tableCellHeader, { textAlign: 'center' }]}
                  >
                    Amount
                  </Text>
                </View>
              </View>
              {serviceParts.map((item, idx) => (
                <View key={idx} style={styles.tableRow}>
                  <View key={idx} style={[tableCol, { width: '50%' }]}>
                    <Text
                      style={[styles.tableCell, item.style ? item.style : {}]}
                    >
                      {item.partcode}
                      <Br />
                      {item.description}
                    </Text>
                  </View>
                  <View key={idx} style={[tableCol, { width: '10%' }]}>
                    <Text
                      style={{ margin: 1, fontSize: 10, textAlign: 'center' }}
                    >
                      {item.quantity}
                    </Text>
                  </View>
                  <View key={idx} style={[tableCol, { width: '20%' }]}>
                    <Text
                      style={{ margin: 1, fontSize: 10, textAlign: 'right' }}
                    >
                      {FormatCurrency(item.price)}
                    </Text>
                  </View>
                  <View key={idx} style={[tableCol, { width: '20%' }]}>
                    <Text
                      style={{ margin: 1, fontSize: 10, textAlign: 'right' }}
                    >
                      {FormatCurrency(item.amount)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <View
              style={{
                display: 'table',
                width: '35%',
                borderStyle: BORDER_STYLE,
                borderColor: BORDER_COLOR,
                borderWidth: 1
              }}
            >
              <View style={[styles.tableRow, styles.headerBg]}>
                <View key="head4" style={[tableCol, { width: '80%' }]}>
                  <Text
                    style={[styles.tableCellHeader, { textAlign: 'center' }]}
                  >
                    Labor Description
                  </Text>
                </View>
                <View key="head5" style={[tableCol, { width: '20%' }]}>
                  <Text
                    style={[styles.tableCellHeader, { textAlign: 'center' }]}
                  >
                    Price
                  </Text>
                </View>
              </View>
              {serviceFailures.map((item, idx) => (
                <View key={idx} style={styles.tableRow}>
                  <View key={idx} style={[tableCol, { width: '80%' }]}>
                    <Text
                      style={[styles.tableCell, item.style ? item.style : {}]}
                    >
                      {item.description}
                      <Br /> {item.comments}
                    </Text>
                  </View>
                  <View key={idx} style={[tableCol, { width: '20%' }]}>
                    <Text
                      style={{ margin: 1, fontSize: 10, textAlign: 'right' }}
                    >
                      {FormatCurrency(item.price)}
                    </Text>
                  </View>
                </View>
              ))}
              {/* <CustomTablePDF
                fields={fieldsParts}
                data={serviceParts}
              ></CustomTablePDF> */}
            </View>
            {/* <View style={styles.table}>
              <CustomTablePDF
                fields={fieldsFailures}
                data={serviceFailures}
              ></CustomTablePDF>
            </View> */}
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default ORderPdf;
