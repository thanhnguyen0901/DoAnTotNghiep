// Import thư viện
import React, { Component } from "react";
import { Text, StyleSheet, Dimensions, Alert, Image } from "react-native";
import {
  Button,
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Input,
  InputGroup,
  Item,
  Left,
  Right
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import MateIcon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import MyFooter from "./../MyFooter";
import db from "../../connectionDB";

// Const & Variable:
const { height, width } = Dimensions.get("window");
export default class GhiChepCuaTaiKhoan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ma_tai_khoan: "",
      so_tien: "",
      so_du_ban_dau: "",
      ten_tai_khoan: "",
      ghi_chep: []
    };
    this.formatMoney = this.formatMoney.bind(this);
  }

  async componentDidMount() {
    const { params } = this.props.navigation.state;
    await this.setState({
      ma_tai_khoan: params.ma_tai_khoan,
      so_tien: params.so_tien,
      so_du_ban_dau: params.so_du_ban_dau,
      ten_tai_khoan: params.ten_tai_khoan
    });
    let tmp = [];
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM chitieu WHERE ma_tai_khoan = ?",
        [this.state.ma_tai_khoan],
        (tx, results) => {
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            tmp.push(row);
          }
          tx.executeSql(
            "SELECT * FROM thunhap WHERE ma_tai_khoan = ?",
            [this.state.ma_tai_khoan],
            (tx, results) => {
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                tmp.push(row);
              }
              let ghi_chep = tmp.sort((a, b) =>
                moment(a.ngay, "YYYY/MM/DD HH:mm:ss") >
                moment(b.ngay, "YYYY/MM/DD HH:mm:ss")
                  ? -1
                  : 1
              );
              this.setState({ ghi_chep: ghi_chep });
            }
          );
        }
      );
    });
  }

  formatMoney(money) {
    money += "";
    var x = money.replace(/,/g, "");
    var y = x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return y;
  }

  render() {
    const { navigation } = this.props;
    var ghi_chep = this.state.ghi_chep;
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{ flex: 2 }}>
            <Button transparent onPress={() => navigation.navigate("TaiKhoan")}>
              <Icon name="credit-card" style={styles.iconHeader} />
            </Button>
          </Left>
          <Body style={{ flex: 8 }}>
            <Text style={styles.textHeader}>{this.state.ten_tai_khoan}</Text>
          </Body>
          <Right style={{ flex: 2 }} />
        </Header>

        <Content style={styles.content}>
          <Card>
            <CardItem>
              <Left>
                <Text>Số dư ban đầu</Text>
              </Left>
              <Right>
                <Text>{this.formatMoney(this.state.so_du_ban_dau)}đ</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Số dư hiện tại</Text>
              </Left>
              <Right>
                <Text>{this.formatMoney(this.state.so_tien)}đ</Text>
              </Right>
            </CardItem>
          </Card>
          <Card>
            {ghi_chep.map((item, i) => (
              <CardItem
                key={i}
                button
                onPress={() => {
                  if (item.loai == "chitieu") {
                    navigation.navigate("ChinhSuaChiTieu", {
                      ma_chi_tieu: item.ma_chi_tieu,
                      so_tien: item.so_tien,
                      icon_hang_muc: item.icon_hang_muc,
                      hang_muc: item.ma_hang_muc_chi,
                      ten_hang_muc: item.ten_hang_muc,
                      mo_ta: item.mo_ta,
                      ngay_chi: item.ngay,
                      tai_khoan: item.ma_tai_khoan,
                      nguoi_chi: item.ma_nguoi_chi
                    });
                  } else if (item.loai == "thunhap") {
                    navigation.navigate("ChinhSuaThuNhap", {
                      ma_thu_nhap: item.ma_thu_nhap,
                      so_tien: item.so_tien,
                      icon_hang_muc: item.icon_hang_muc,
                      hang_muc: item.ma_hang_muc_chi,
                      ten_hang_muc: item.ten_hang_muc,
                      mo_ta: item.mo_ta,
                      ngay_thu: item.ngay,
                      tai_khoan: item.ma_tai_khoan,
                      nguoi_thu: item.ma_nguoi_thu
                    });
                  } else if (item.loai == "chuyenkhoan") {
                    navigation.navigate("ChinhSuaChuyenKhoan", {
                      ma_chuyen_khoan: item.ma_chuyen_khoan
                    });
                  } else if (item.loai == "dcsd") {
                    navigation.navigate("ChinhSuaDieuChinhSoDu", {
                      ma_dieu_chinh: item.ma_dieu_chinh
                    });
                  }
                }}
                style={styles.cardItem}
              >
                <Left style={{ flex: 1 }}>
                  <Image
                    source={{ uri: item.icon_hang_muc }}
                    style={{
                      borderRadius: 15,
                      width: 30,
                      height: 30,
                      backgroundColor: "white"
                    }}
                  />
                </Left>
                <Body
                  style={{ flex: 6, flexDirection: "column", marginLeft: 15 }}
                >
                  <Text style={{ fontSize: 20 }}>{item.ten_hang_muc}</Text>
                  <Text
                    style={{ fontSize: 15, marginTop: 5, fontStyle: "italic" }}
                  >
                    {item.mo_ta}
                  </Text>
                  <Text style={{ fontSize: 18, marginTop: 5 }}>
                    {moment(item.ngay).format("DD/MM/YYYY")}
                  </Text>
                </Body>
                <Right style={{ flex: 6 }}>
                  <Text
                    style={{
                      ...styles.textContentMoney,
                      color:
                        item.loai == "chitieu"
                          ? "red"
                          : item.loai == "chuyenkhoan" &&
                            item.loai_chuyen_khoan == "chitieu"
                          ? "red"
                          : item.loai == "chuyenkhoan" &&
                            item.loai_chuyen_khoan == "phi"
                          ? "red"
                          : item.loai == "chuyenkhoan" &&
                            item.loai_chuyen_khoan == "thunhap"
                          ? "green"
                          : item.loai == "dcsd" &&
                            item.loai_dieu_chinh_so_du == "chitieu"
                          ? "red"
                          : item.loai == "dcsd" &&
                            item.loai_chuyen_khoan == "thunhap"
                          ? "green"
                          : "green"
                    }}
                  >
                    {this.formatMoney(item.so_tien)} đ
                  </Text>
                </Right>
              </CardItem>
            ))}
          </Card>
        </Content>

        <MyFooter navigation={this.props.navigation} />
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  buttonCardItem: {
    backgroundColor: "black",
    borderBottomWidth: 0.7,
    borderColor: "grey",
    height: 50,
    marginTop: 5
  },
  card: {
    marginLeft: 5,
    marginRight: 5
  },
  cardItem: {
    borderColor: "grey",
    borderBottomWidth: 1,
    marginTop: 5
  },
  content: {
    backgroundColor: "#F1F1F1",
    height: height - 104,
    left: 0,

    right: 0
  },
  footer: {
    backgroundColor: "black",
    color: "white",
    height: 40
  },
  header: {
    backgroundColor: "#009933",
    borderBottomColor: "black",
    height: 40,
    alignItems: "center"
  },
  icon: {
    color: "black",
    fontSize: 18
  },
  iconHeader: {
    color: "white",
    fontSize: 18
  },
  iconPlusCircle: {
    color: "white",
    fontSize: 30
  },
  input: {
    color: "black",
    fontSize: 20,
    textAlign: "right"
  },
  textContent: {
    color: "black",
    fontSize: 20,
    paddingLeft: 10
  },
  textContentMoney: {
    color: "black",
    fontSize: 20
  },
  textHeader: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold"
  },
  textFooter: {
    color: "white",
    fontSize: 10,
    fontFamily: "Times New Roman"
  },
  titleContent: { fontWeight: "bold", color: "black" }
});
