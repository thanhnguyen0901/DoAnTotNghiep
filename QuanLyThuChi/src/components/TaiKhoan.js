// Import thư viện
import React, { Component } from "react";
import { Text, StyleSheet, Dimensions, Platform } from "react-native";
import {
  Button,
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Left,
  Right
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import MyFooter from "../MyFooter";
import db from "../../connectionDB";

// Const & Variable:
const { height, width } = Dimensions.get("window");

export default class TaiKhoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taiKhoanDangSuDung: [],
      taiKhoanNgungSuDung: [],
      tongTienTaiKhoanDangSuDung: 0,
      tongTienTaiKhoanNgungSuDung: 0
    };
    this.formatMoney = this.formatMoney.bind(this);
  }
  componentDidMount() {
    this.props.navigation.addListener("didFocus", payload => {
      this.setState({
        taiKhoanDangSuDung: [],
        taiKhoanNgungSuDung: [],
        tongTienTaiKhoanDangSuDung: 0,
        tongTienTaiKhoanNgungSuDung: 0
      });
      let taiKhoanDangSuDung = [];
      let taiKhoanNgungSuDung = [];
      let tongTienTaiKhoanDangSuDung = 0;
      let tongTienTaiKhoanNgungSuDung = 0;
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM taikhoan WHERE dang_su_dung like 'y' and xoa like 'n'",
          [],
          (tx, results) => {
            let len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              tongTienTaiKhoanDangSuDung += row.so_tien;
              taiKhoanDangSuDung.push(row);
            }
            this.setState({
              taiKhoanDangSuDung: taiKhoanDangSuDung,
              tongTienTaiKhoanDangSuDung: tongTienTaiKhoanDangSuDung
            });
          }
        );
      });
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM taikhoan WHERE dang_su_dung like 'n' and xoa like 'n'",
          [],
          (tx, results) => {
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              tongTienTaiKhoanNgungSuDung += row.so_tien;
              taiKhoanNgungSuDung.push(row);
            }
            this.setState({
              taiKhoanNgungSuDung: taiKhoanNgungSuDung,
              tongTienTaiKhoanNgungSuDung: tongTienTaiKhoanNgungSuDung
            });
          }
        );
      });
    });
  }

  // Function
  formatMoney(money) {
    money = money + "";
    var x = money.replace(/,/g, "");
    var y = x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return y;
  }

  render() {
    const { navigation } = this.props;
    console.log(this.state);
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{ flex: 2 }} />
          <Body style={{ flex: 8 }}>
            <Text style={styles.textHeader}>TÀI KHOẢN</Text>
          </Body>
          <Right style={{ flex: 2 }}>
            <Button
              transparent
              onPress={() => navigation.navigate("ThemTaiKhoan")}
            >
              <Icon name="plus" style={styles.iconHeader} />
            </Button>
          </Right>
        </Header>

        <Content style={styles.content}>
          <Card>
            <CardItem style={styles.cardItem}>
              <Text
                style={{
                  ...styles.titleContent,
                  color:
                    this.state.tongTienTaiKhoanDangSuDung +
                      this.state.tongTienTaiKhoanNgungSuDung >=
                    0
                      ? "black"
                      : "red"
                }}
              >
                Tổng tiền:{" "}
                {this.formatMoney(
                  this.state.tongTienTaiKhoanDangSuDung +
                    this.state.tongTienTaiKhoanNgungSuDung
                )}
                đ
              </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem style={styles.cardItem}>
              <Text
                style={{
                  ...styles.titleContent,
                  color:
                    this.state.tongTienTaiKhoanDangSuDung >= 0 ? "black" : "red"
                }}
              >
                Đang sử dụng:{" "}
                {this.formatMoney(this.state.tongTienTaiKhoanDangSuDung)}đ
              </Text>
            </CardItem>
            {this.state.taiKhoanDangSuDung.map((item, i) => (
              <CardItem
                key={i}
                button
                onPress={() => {
                  navigation.navigate("GhiChepCuaTaiKhoan", {
                    ma_tai_khoan: item.ma_tai_khoan,
                    so_tien: item.so_tien,
                    so_du_ban_dau: item.so_du_ban_dau,
                    ten_tai_khoan: item.ten_tai_khoan
                  });
                }}
                onLongPress={() =>
                  navigation.navigate("ChinhSuaTaiKhoan", {
                    ma_tai_khoan: item.ma_tai_khoan,
                    ten_tai_khoan: item.ten_tai_khoan,
                    so_tien: item.so_tien,
                    loai_tai_khoan: item.loai_tai_khoan,
                    mo_ta: item.mo_ta,
                    dang_su_dung: item.dang_su_dung
                  })
                }
                style={styles.cardItem}
              >
                <Left style={{ flex: 1 }}>
                  <Icon name="credit-card" style={styles.icon} />
                </Left>
                <Body style={{ flex: 6 }}>
                  <Text style={styles.textContent}>{item.ten_tai_khoan}</Text>
                </Body>
                <Right style={{ flex: 6 }}>
                  <Text
                    style={{
                      ...styles.textContentMoney,
                      color: item.so_tien >= 0 ? "black" : "red"
                    }}
                  >
                    {this.formatMoney(item.so_tien)}đ
                  </Text>
                </Right>
              </CardItem>
            ))}
          </Card>
          <Card>
            <CardItem style={styles.cardItem}>
              <Text
                style={{
                  ...styles.titleContent,
                  color:
                    this.state.tongTienTaiKhoanNgungSuDung >= 0
                      ? "black"
                      : "red"
                }}
              >
                Ngưng sử dụng:{" "}
                {this.formatMoney(this.state.tongTienTaiKhoanNgungSuDung)}đ
              </Text>
            </CardItem>
            {this.state.taiKhoanNgungSuDung.map((item, i) => (
              <CardItem
                key={i}
                button
                onPress={() => {
                  navigation.navigate("GhiChepCuaTaiKhoan", {
                    ma_tai_khoan: item.ma_tai_khoan,
                    so_tien: item.so_tien,
                    so_du_ban_dau: item.so_du_ban_dau,
                    ten_tai_khoan: item.ten_tai_khoan
                  });
                }}
                onLongPress={() =>
                  navigation.navigate("ChinhSuaTaiKhoan", {
                    ma_tai_khoan: item.ma_tai_khoan,
                    ten_tai_khoan: item.ten_tai_khoan,
                    so_tien: item.so_tien,
                    loai_tai_khoan: item.loai_tai_khoan,
                    mo_ta: item.mo_ta,
                    dang_su_dung: item.dang_su_dung
                  })
                }
                style={styles.cardItem}
              >
                <Left style={{ flex: 1 }}>
                  <Icon name="credit-card" style={styles.icon} />
                </Left>
                <Body style={{ flex: 6 }}>
                  <Text style={styles.textContent}>{item.ten_tai_khoan}</Text>
                </Body>
                <Right
                  style={{
                    flex: 6,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      ...styles.textContentMoney,
                      color: item.so_tien >= 0 ? "black" : "red"
                    }}
                  >
                    {this.formatMoney(item.so_tien)}đ
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
    height: 50,
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
    height: 40
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
const stylesFooter = StyleSheet.create({
  iconHeader: {
    color: "white",
    fontSize: 18
  },
  iconFooter: {
    color: "grey",
    fontSize: 18
  },
  iconPlusCircle: {
    color: "#009933",
    fontSize: 30
  },
  footer: {
    backgroundColor: "white",
    color: "black",
    height: 40
  },
  textFooter: {
    color: "black",
    fontSize: 12,
    fontFamily: "Times New Roman"
  }
});
