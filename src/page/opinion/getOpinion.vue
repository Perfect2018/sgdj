<template>
    <el-container>
        <el-header>
            <Header>
                >&nbsp;意见列表
            </Header>
        </el-header>
        <el-main class="showMain">
            <!-- 条件查询 -->
            <el-card class="box">
                <div slot="header">
                    <span>条件查询</span>
                </div>
                <div class="from-item">
                    <el-form :model="searchForm" ref="search" label-width="100px" label-suffix="">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="处理状态">
                                    <el-select v-model="searchForm.result">
                                        <el-option label="已处理" value="00"></el-option>
                                        <el-option label="处理中" value="01"></el-option>
                                        <el-option label="未处理" value="02"></el-option>
                                        <el-option label="全部" value=""></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="">
                                    <el-button class="search-btn" type="primary" @click="handleSearch">查询</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-card>
            <!-- 列表数据展示 -->
            <el-card class="box">
                <el-table :data="data" :height="clientHeight-355" border>
                    <el-table-column show-overflow-tooltip label="客户姓名" prop="name"></el-table-column>
                    <el-table-column show-overflow-tooltip label="意见内容" prop="opinionContent"></el-table-column>
                    <el-table-column show-overflow-tooltip label="反馈时间" prop="submitDate"
                                     :formatter="timeFmt"></el-table-column>
                    <el-table-column show-overflow-tooltip label="采纳结果" prop="result"
                                     :formatter="stateFmt"></el-table-column>
                    <el-table-column show-overflow-tooltip label="平台回复内容" prop="huifuneirong"></el-table-column>
                    <el-table-column show-overflow-tooltip label="创建时间" prop="createDate"
                                     :formatter="timeFmt"></el-table-column>
                    <el-table-column width="150px" label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    v-if="scope.row.state != '00'"
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
                    result: '00'
                },
                //列表数据
                data: [
                    {
                        name: 'name',
                        opinionContent: 'opinionContent',
                        submitDate: 'submitDate',
                        result: 'result',
                        huifuneirong: 'huifuneirong',
                        createDate: 'createDate',
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
                //console.log("handleSearch");
            },
            //分页
            handlePageChange() {
                //console.log("handlePageChange");
            },
            //处理
            handleDispose(index, row) {
                //console.log('handleDispose', index, row);
            },

            //时间格式化(创建时间)
            timeFmt(row) {
                return new Date(row.createDate).toLocaleDateString().replace(/\//g, "-")
            },
            //状态格式化
            stateFmt(row) {
                return row.result == '00' ? '已处理' : (row.result == '01' ? '处理中' : '未处理');
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
