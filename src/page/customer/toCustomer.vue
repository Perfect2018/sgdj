<template>
    <el-container>
        <el-header>
            <Header>
                >&nbsp;客户列表
            </Header>
        </el-header>
        <el-main class="showMain">
            <!-- 条件查询 -->
            <el-card class="box">
                <div slot="header">
                    <span>条件查询</span>
                </div>
                <div class="from-item">
                    <el-form :model="searchFrom" ref="search" label-width="100px" label-suffix="">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="名称">
                                    <el-input size="medium" v-model="searchFrom.name"
                                              placeholder="请输入关键词"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="">
                                    <el-button class="search-btn" type="primary" @click="handleSearch">查询</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-row>
                        <el-col :span="8">
                            <el-radio-group v-model="listType" style="">
                                <el-radio-button label="00">全部</el-radio-button>
                                <el-radio-button label="01">黑名单</el-radio-button>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                </div>
            </el-card>

            <!-- 列表数据展示 -->
            <el-card class="box">
                <el-table :data="data" :height="clientHeight-415" border>
                    <el-table-column show-overflow-tooltip label="编号" prop="id"></el-table-column>
                    <el-table-column show-overflow-tooltip label="客户名称" prop="name"></el-table-column>
                    <el-table-column show-overflow-tooltip label="性别" prop="sex"></el-table-column>
                    <el-table-column show-overflow-tooltip label="联系方式" prop="phone"></el-table-column>
                    <el-table-column show-overflow-tooltip label="注册日期" prop="createDate"></el-table-column>
                    <el-table-column show-overflow-tooltip label="下单量" prop="orderCount"></el-table-column>
                    <el-table-column show-overflow width="150px" label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleShowUser(scope.$index,scope.row)">查看
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleEdit(scope.$index, scope.row)">拉黑
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination
hide-on-single-page
                            background
                            :current-page="currentPage"
                            @current-change="handlePageChange"
                            layout="prev, pager, next"
                            :total="total">
                    </el-pagination>
                </div>
            </el-card>
            <!-- 用户详情 -->
            <el-dialog title="用户详情" :visible.sync="showFormVisible" class="show-user">
                <el-row>
                    <el-col :span="8" class="user-detail">

                        <img :src="showUser.img" alt="" class="user-img">
                        <el-form label-width="100px">
                            <el-form-item label="用户编号">
                                <p size="medium" v-text="showUser.id"></p>
                            </el-form-item>
                            <el-form-item label="用户名称">
                                <p size="medium" v-text="showUser.name"></p>
                            </el-form-item>
                            <el-form-item label="性别">
                                <p size="medium" v-text="showUser.sex"></p>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <p size="medium" v-text="showUser.phone"></p>
                            </el-form-item>
                            <el-form-item label="注册时间">
                                <p size="medium" v-text="showUser.createDate"></p>
                            </el-form-item>
                            <el-form-item label="下单量">
                                <p size="medium" v-text="showUser.orderCount"></p>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="16">
                        <el-radio-group size="mini" v-model="userListType" class="user-type">
                            <el-radio-button label="00">订单</el-radio-button>
                            <el-radio-button label="01">积分</el-radio-button>
                            <el-radio-button label="02">红包</el-radio-button>
                        </el-radio-group>
                        <el-table v-if="userListType=='00'" :data="data" height="300" border>
                            <el-table-column show-overflow-tooltip label="订单" prop="id"></el-table-column>
                            <el-table-column show-overflow-tooltip label="订单编号" prop="name"></el-table-column>
                            <el-table-column show-overflow-tooltip label="价格" prop="sex"></el-table-column>
                            <el-table-column show-overflow-tooltip label="运费" prop="phone"></el-table-column>
                            <el-table-column show-overflow-tooltip label="下单时间" prop="createDate"></el-table-column>
                        </el-table>
                        <el-table v-if="userListType=='01'" :data="data" height="300" border>
                            <el-table-column show-overflow-tooltip label="积分" prop="id"></el-table-column>
                            <el-table-column show-overflow-tooltip label="订单编号" prop="name"></el-table-column>
                            <el-table-column show-overflow-tooltip label="价格" prop="sex"></el-table-column>
                            <el-table-column show-overflow-tooltip label="运费" prop="phone"></el-table-column>
                            <el-table-column show-overflow-tooltip label="下单时间" prop="createDate"></el-table-column>
                        </el-table>
                        <el-table v-if="userListType=='02'" :data="data" height="300" border>
                            <el-table-column show-overflow-tooltip label="红包" prop="id"></el-table-column>
                            <el-table-column show-overflow-tooltip label="订单编号" prop="name"></el-table-column>
                            <el-table-column show-overflow-tooltip label="价格" prop="sex"></el-table-column>
                            <el-table-column show-overflow-tooltip label="运费" prop="phone"></el-table-column>
                            <el-table-column show-overflow-tooltip label="下单时间" prop="createDate"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-dialog>
            <Footer></Footer>
        </el-main>
    </el-container>
</template>

<script>
    import Header from "../../components/header";
    import Footer from "../../components/footer";

    export default {
        name: "toCategory",
        components: {
            Footer,
            Header
        },
        props: ['clientHeight'],
        data() {
            return {
                //搜索表单
                searchFrom: {
                    name: ''
                },
                //查询条件
                listType: '00',
                userListType: '00',
                //列表数据
                data: [
                    {
                        id: 'id',
                        name: 'name',
                        sex: 'sex',
                        phone: 'phone',
                        createDate: 'createDate',
                        orderCount: 'orderCount',
                        img: ''
                    }
                ],
                showUser: {},
                total: 1,
                currentPage: 1,
                showFormVisible: false,
            }
        },
        methods: {
            handleShowUser(index, row) {
                this.showFormVisible = true;
                this.showUser = row;
                //console.log('handleShowUser', this.showUser)
            },
            handleSearch() {
                //console.log("handleSearch")
            },

            handlePageChange() {
                //console.log("handlePageChange")
            },

            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.data.splice(index, 1);
                    //console.log("handleDelete", index, row)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },
            timeFmt(row) {
                return new Date(row.receiveDate).toLocaleDateString().replace(/\//g, "-")
            }

        }
    }
</script>

<style lang="scss" scoped>
    .showMain {
        padding: 10px;
        background-color: #E6E6E6;

        .el-radio-group {
            margin-left: 100px;
            width: 100%;
        }

        .box {
            border-radius: 8px;
            margin-bottom: 10px;
        }

        .search-btn {
            width: 30%;
        }

        .el-form-item {
            margin: 10px 0;
        }

        .show-user {
            .user-detail {
                border-right: 1px solid #ddd;

                .user-img {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-left: 25px;
                }

                .el-form-item {
                    margin: 5px 0;
                }
            }

            .user-type {
                margin-bottom: 20px;
            }
        }


    }
</style>
