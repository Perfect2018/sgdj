<template>
    <el-container>
        <el-header>
            <Header>
                >&nbsp;合伙人管理
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
                                <el-form-item label="客户手机号">
                                    <el-input size="medium" v-model="searchFrom.mobile"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="客户状态">
                                    <el-select v-model="searchFrom.state">
                                        <el-option label="未处理" value="00"></el-option>
                                        <el-option label="已处理" value="01"></el-option>
                                        <el-option label="所有" value=""></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="">
                                    <el-button class="search-btn" type="primary" @click="handleSearch">查询</el-button>
                                    <el-button class="add-audit-btn" type="success" @click="addFormVisible = true">
                                        添加骑士
                                    </el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-card>
            <!-- 列表数据展示 -->
            <el-card class="box">
                <el-table :data="data" :height="clientHeight-355" border>
                    <el-table-column show-overflow-tooltip label="姓名" prop="custName"></el-table-column>
                    <el-table-column show-overflow-tooltip label="联系电话" prop="mobile"></el-table-column>
                    <el-table-column show-overflow-tooltip label="加盟区域" prop="joinArea"></el-table-column>
                    <el-table-column show-overflow-tooltip label="是否法人主体" prop="isLegalPerson"
                                     :formatter="legalPersonFmt"></el-table-column>
                    <el-table-column show-overflow-tooltip label="是否有公办场地" prop="isHasWorkplace"
                                     :formatter="hasWorkplaceFmt"></el-table-column>
                    <el-table-column show-overflow-tooltip label="可有金额(万元)" prop="investAmt"
                                     :formatter="investAmtFmt"></el-table-column>
                    <el-table-column show-overflow-tooltip label="相关经验" prop="raleteExperience"></el-table-column>
                    <el-table-column show-overflow-tooltip label="资源介绍" prop="assetNote"></el-table-column>
                    <el-table-column show-overflow-tooltip label="状态" prop="state"
                                     :formatter="stateFmt"></el-table-column>
                    <el-table-column width="150px" label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    v-if="scope.row.state == '00'"
                                    @click="handleDispose(scope.$index, scope.row)">处理
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="info"
                                    disabled
                                    v-else>已处理
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
            <Footer></Footer>
        </el-main>
    </el-container>
</template>

<script>
    import Header from "../../components/header";
    import Footer from "../../components/footer";

    export default {
        name: "getRecruit",
        components: {
            Header,
            Footer
        },
        props: ['clientHeight'],
        data() {
            return {
                //搜索表单
                searchForm: {
                    mobile: '',
                    state: '00'
                },
                //列表数据
                data: [
                    {
                        custName: 'custName',
                        mobile: 'mobile',
                        joinArea: 'joinArea',
                        isLegalPerson: 'isLegalPerson',
                        isHasWorkplace: 'isHasWorkplace',
                        investAmt: 'investAmt',
                        raleteExperience: 'raleteExperience',
                        assetNote: 'assetNote',
                        state: '01'
                    }
                ],
                total: 1,
                currentPage: 1,
                formLabelWidth: '150px'
            }
        },
        methods: {
            //执行搜索
            handleSearch() {
                //console.log("handleSearch")
            },
            //处理
            handleDispose(index, row) {
                //console.log('handleDispose', index, row)
            },
            //分页
            handlePageChange() {
                //console.log("handlePageChange")
            },

            // 是否法人主体
            legalPersonFmt(row) {
            },
            // 是否有公办场地
            hasWorkplaceFmt(row) {
            },
            // 可有金额(万元)
            investAmtFmt(row) {
            },
            //状态格式化
            stateFmt(row) {
                return row.state == '00' ? '未处理' : (row.state == '01' ? '已处理' : '未知');
            }

        }
    }
</script>

<style lang="scss" scoped>
    .showMain {
        padding: 10px;
        background-color: #E6E6E6;

        .box {
            border-radius: 8px;
            margin-bottom: 10px;
        }

        .search-btn {
            width: 30%;
        }

        .add-audit-btn {
            width: 45%;
        }

        .el-form-item {
            margin: 10px 0;
        }
    }
</style>
