import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Input } from 'antd';
import {
	DesktopOutlined,
	DeploymentUnitOutlined,
	ApiOutlined,
	UserOutlined,
	CommentOutlined,
	ReadOutlined,
	FunctionOutlined
} from '@ant-design/icons';
import { 
	BrowserRouter as Router, 
	Route, 
	Link,
	Switch,
} from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
// import * as d3 from 'd3'
// import { ECharts, EChartsResponsiveOption } from 'echarts';
// import * as echarts from 'echarts'
import RadialTreeView from './components/RadialTreeView'
import './App.css';
import ForceDirectedView from './components/ForceDirectedView';

interface AppProps {
	
}
interface AppState {
	// pageIndex: number,
	collapsed: boolean,
}
class App extends Component <AppProps, AppState>{
    // private myChart: ECharts | null;

	public constructor(props : AppProps) {
		super(props)
        // this.myChart = null

		this.state = {
			// pageIndex: 0,
			collapsed: false
		}
	}
	
	public render() : JSX.Element {
		const { Header, Content, Footer, Sider } = Layout;
		const { SubMenu } = Menu;
		const { Search } = Input;
		const { collapsed } = this.state;
		return (
			<Router>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider collapsible collapsed={collapsed} 
				theme='light'
					onCollapse={
					() => {
						console.log(collapsed);
						this.setState({ collapsed: !collapsed });
					}
				}>
					<div className="logo" style={{
						width: '100%',
						height: '60px',
						// backgroundColor: 'red'
						// lineHeight: '60px',
						// textAlign: 'center',
						// fontSize: '17px'
					}}>
						{
							!collapsed ? 
							<React.Fragment>
								<svg viewBox="0 0 1024 1024" width="40" height="40" style={{
									margin: '10px 10px 10px 20px'
								}}>
									<path d="M121.088 317.8496a83.4048 83.4048 0 1 0 166.7584 0 83.4048 83.4048 0 0 0-166.7584 0z" fill="#B9DAFF" />
									<path d="M204.4928 419.4816a101.7856 101.7856 0 0 1-101.632-101.632c0-56.0128 45.568-101.5808 101.632-101.5808 56.0128 0 101.632 45.568 101.632 101.5808 0 56.1152-45.6192 101.632-101.632 101.632z m0-166.656a65.1776 65.1776 0 1 0 0.0512 130.3552 65.1776 65.1776 0 0 0-0.0512-130.3552z" fill="#0A70F5" />
									<path d="M120.9856 819.8656a83.4048 83.4048 0 1 0 166.7584 0 83.4048 83.4048 0 0 0-166.7584 0z" fill="#B9DAFF" />
									<path d="M204.3904 921.3952a101.7856 101.7856 0 0 1-101.632-101.5808c0-56.0128 45.6192-101.632 101.632-101.632s101.632 45.568 101.632 101.632a101.7856 101.7856 0 0 1-101.632 101.5808z m0-166.656a65.1776 65.1776 0 1 0 0.0512 130.3552 65.1776 65.1776 0 0 0-0.0512-130.3552z" fill="#0A70F5" />
									<path d="M736.256 818.432a83.4048 83.4048 0 1 0 166.7584 0 83.4048 83.4048 0 0 0-166.7584 0z" fill="#B9DAFF" />
									<path d="M819.6096 919.9616a101.7856 101.7856 0 0 1-101.632-101.632c0-56.0128 45.6192-101.632 101.632-101.632s101.632 45.6192 101.632 101.632c0 56.1152-45.568 101.632-101.632 101.632z m0-166.656a65.1776 65.1776 0 1 0 0.1024 130.3552 65.1776 65.1776 0 0 0-0.1024-130.3552z" fill="#0A70F5" />
									<path d="M733.3888 462.7456a83.4048 83.4048 0 1 0 166.7584 0 83.4048 83.4048 0 0 0-166.7584 0z" fill="#B9DAFF" />
									<path d="M816.7936 564.3776a101.7856 101.7856 0 0 1-101.632-101.632c0-56.0128 45.568-101.632 101.632-101.632 56.0128 0 101.632 45.568 101.632 101.632 0 56.0128-45.6192 101.632-101.632 101.632z m0-166.7584a65.1776 65.1776 0 1 0 0.0512 130.3552 65.1776 65.1776 0 0 0-0.0512-130.3552z" fill="#0A70F5" />
									<path d="M433.1008 204.1344a83.4048 83.4048 0 1 0 166.7584 0 83.4048 83.4048 0 0 0-166.7584 0z" fill="#B9DAFF" />
									<path d="M516.4544 305.7152a101.7856 101.7856 0 0 1-101.632-101.5808c0-56.0128 45.6192-101.632 101.632-101.632s101.632 45.568 101.632 101.632c0 56.0128-45.568 101.5808-101.632 101.5808z m0-166.656a65.1776 65.1776 0 1 0 0.1024 130.3552 65.1776 65.1776 0 0 0-0.1024-130.3552z" fill="#0A70F5" />
									<path d="M367.6672 518.0416a144.7936 144.7936 0 1 0 289.5872 0 144.7936 144.7936 0 0 0-289.5872 0z" fill="#FFFFFF" />
									<path d="M367.6672 518.0416a144.7936 144.7936 0 1 0 289.5872 0 144.7936 144.7936 0 0 0-289.5872 0z" fill="#FFFFFF" />
									<path d="M512.4608 681.0624a163.2256 163.2256 0 0 1-163.0208-163.0208 163.2256 163.2256 0 0 1 163.0208-163.0208 163.1744 163.1744 0 0 1 163.0208 163.0208 163.2256 163.2256 0 0 1-163.0208 163.0208z m0-289.6384a126.6688 126.6688 0 0 0-126.5152 126.464 126.6688 126.6688 0 0 0 126.464 126.5664 126.6688 126.6688 0 0 0 126.5664-126.5152 126.72 126.72 0 0 0-126.5152-126.5152z" fill="#0A70F5" />
									<path d="M278.8864 346.7776l129.4848 84.992-20.0704 30.5152-129.4848-84.992zM730.9312 459.1104l5.12 36.096-84.48 12.0832-5.12-36.1472zM494.2336 274.944h36.4544v87.04h-36.4544zM385.536 612.2496l25.4976 26.112-125.5424 122.3168-25.4464-26.112zM640.6144 613.7856l146.0224 146.0224-25.7536 25.8048-146.0736-146.0224z" fill="#0A70F5" />
								</svg>
								<div style={{
									float: 'right',
									lineHeight: '60px',
									fontSize: '24px',
									fontWeight: 'bold',
									color: 'rgb(13,110,253)',
									marginRight: '30px'
								}}>
									知识工具
								</div>
							</React.Fragment> :
							<React.Fragment>
								<svg viewBox="0 0 1024 1024" width="40" height="40" style={{
									margin: '10px 10px 10px 20px'
								}}>
									<path d="M121.088 317.8496a83.4048 83.4048 0 1 0 166.7584 0 83.4048 83.4048 0 0 0-166.7584 0z" fill="#B9DAFF" />
									<path d="M204.4928 419.4816a101.7856 101.7856 0 0 1-101.632-101.632c0-56.0128 45.568-101.5808 101.632-101.5808 56.0128 0 101.632 45.568 101.632 101.5808 0 56.1152-45.6192 101.632-101.632 101.632z m0-166.656a65.1776 65.1776 0 1 0 0.0512 130.3552 65.1776 65.1776 0 0 0-0.0512-130.3552z" fill="#0A70F5" />
									<path d="M120.9856 819.8656a83.4048 83.4048 0 1 0 166.7584 0 83.4048 83.4048 0 0 0-166.7584 0z" fill="#B9DAFF" />
									<path d="M204.3904 921.3952a101.7856 101.7856 0 0 1-101.632-101.5808c0-56.0128 45.6192-101.632 101.632-101.632s101.632 45.568 101.632 101.632a101.7856 101.7856 0 0 1-101.632 101.5808z m0-166.656a65.1776 65.1776 0 1 0 0.0512 130.3552 65.1776 65.1776 0 0 0-0.0512-130.3552z" fill="#0A70F5" />
									<path d="M736.256 818.432a83.4048 83.4048 0 1 0 166.7584 0 83.4048 83.4048 0 0 0-166.7584 0z" fill="#B9DAFF" />
									<path d="M819.6096 919.9616a101.7856 101.7856 0 0 1-101.632-101.632c0-56.0128 45.6192-101.632 101.632-101.632s101.632 45.6192 101.632 101.632c0 56.1152-45.568 101.632-101.632 101.632z m0-166.656a65.1776 65.1776 0 1 0 0.1024 130.3552 65.1776 65.1776 0 0 0-0.1024-130.3552z" fill="#0A70F5" />
									<path d="M733.3888 462.7456a83.4048 83.4048 0 1 0 166.7584 0 83.4048 83.4048 0 0 0-166.7584 0z" fill="#B9DAFF" />
									<path d="M816.7936 564.3776a101.7856 101.7856 0 0 1-101.632-101.632c0-56.0128 45.568-101.632 101.632-101.632 56.0128 0 101.632 45.568 101.632 101.632 0 56.0128-45.6192 101.632-101.632 101.632z m0-166.7584a65.1776 65.1776 0 1 0 0.0512 130.3552 65.1776 65.1776 0 0 0-0.0512-130.3552z" fill="#0A70F5" />
									<path d="M433.1008 204.1344a83.4048 83.4048 0 1 0 166.7584 0 83.4048 83.4048 0 0 0-166.7584 0z" fill="#B9DAFF" />
									<path d="M516.4544 305.7152a101.7856 101.7856 0 0 1-101.632-101.5808c0-56.0128 45.6192-101.632 101.632-101.632s101.632 45.568 101.632 101.632c0 56.0128-45.568 101.5808-101.632 101.5808z m0-166.656a65.1776 65.1776 0 1 0 0.1024 130.3552 65.1776 65.1776 0 0 0-0.1024-130.3552z" fill="#0A70F5" />
									<path d="M367.6672 518.0416a144.7936 144.7936 0 1 0 289.5872 0 144.7936 144.7936 0 0 0-289.5872 0z" fill="#FFFFFF" />
									<path d="M367.6672 518.0416a144.7936 144.7936 0 1 0 289.5872 0 144.7936 144.7936 0 0 0-289.5872 0z" fill="#FFFFFF" />
									<path d="M512.4608 681.0624a163.2256 163.2256 0 0 1-163.0208-163.0208 163.2256 163.2256 0 0 1 163.0208-163.0208 163.1744 163.1744 0 0 1 163.0208 163.0208 163.2256 163.2256 0 0 1-163.0208 163.0208z m0-289.6384a126.6688 126.6688 0 0 0-126.5152 126.464 126.6688 126.6688 0 0 0 126.464 126.5664 126.6688 126.6688 0 0 0 126.5664-126.5152 126.72 126.72 0 0 0-126.5152-126.5152z" fill="#0A70F5" />
									<path d="M278.8864 346.7776l129.4848 84.992-20.0704 30.5152-129.4848-84.992zM730.9312 459.1104l5.12 36.096-84.48 12.0832-5.12-36.1472zM494.2336 274.944h36.4544v87.04h-36.4544zM385.536 612.2496l25.4976 26.112-125.5424 122.3168-25.4464-26.112zM640.6144 613.7856l146.0224 146.0224-25.7536 25.8048-146.0736-146.0224z" fill="#0A70F5" />
								</svg>
							</React.Fragment>

						}
					</div>
					<Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
						<SubMenu key="sub1" icon={<DeploymentUnitOutlined />} title="图谱展示">
							{/* <Link to=''>力导向图</Link>
							<Link to=''></Link> */}

							<Menu.Item key="3"><Link to='/radial-tree'>径向树图</Link></Menu.Item>
							<Menu.Item key="4"><Link to='/force-directed'>力导向图</Link></Menu.Item>
							<Menu.Item key="5">option 3</Menu.Item>
						</SubMenu>
						<SubMenu key="sub2" icon={<CommentOutlined />} title="语料管理">
							<Menu.Item key="6">option 1</Menu.Item>
							<Menu.Item key="7">option 2</Menu.Item>
							<Menu.Item key="8">option 3</Menu.Item>
						</SubMenu>
						<SubMenu key="sub3" icon={<ReadOutlined />} title="字典管理">
							<Menu.Item key="9">option 1</Menu.Item>
							<Menu.Item key="10">option 2</Menu.Item>
							<Menu.Item key="11">option 3</Menu.Item>
						</SubMenu>
						<SubMenu key="sub4" icon={<FunctionOutlined />} title="算法管理">
							<Menu.Item key="12">option 1</Menu.Item>
							<Menu.Item key="13">option 2</Menu.Item>
							<Menu.Item key="14">option 3</Menu.Item>
						</SubMenu>
						<Menu.Item key="15" icon={<DesktopOutlined />}>
							第三方知识管理
						</Menu.Item>
						<Menu.Item key="16" icon={<ApiOutlined />}>
							接口管理
						</Menu.Item>
						<Menu.Item key="17" icon={<UserOutlined />}>
							用户管理
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout className="site-layout" >
					<Header className="site-layout-background"  style={{ padding: 0, backgroundColor:'white' }} >
					<Search placeholder="请输入查找的内容"  enterButton size='large' style={{
						width: '400px',
						marginTop: '10px',
						marginLeft: '20px'
					}}/>
					</Header>
					<Content style={{ margin: '0 16px' }}>
						<Breadcrumb style={{ margin: '5px 0' }} separator=">">
							<Breadcrumb.Item>图谱展示</Breadcrumb.Item>
							<Breadcrumb.Item>径向树图</Breadcrumb.Item>
						</Breadcrumb>
						<div className="site-layout-background" style={{ 
							// backgroundColor: 'red'
						}}>
							<Switch>
								<Route path="/radial-tree" component={RadialTreeView} exact/>
								<Route path="/force-directed" component={ForceDirectedView} exact/>

							</Switch>
							
						</div>
					</Content>
					<Footer style={{
						textAlign: 'center',
						height: '20px'
					}}>Knowledge Graph ©2021 Created by ZUFE VIG</Footer>
				</Layout>
			</Layout>
			</Router>
		)
	}
	public componentDidMount() : void {//嵌套式数据.json
        axios.get('http://localhost:3000/data/嵌套式数据.json')
            .then((res:AxiosResponse<any>) => {
                // console.log(res.data);
                // const radius = 487.5
                // const tree = d3.cluster().size([2 * Math.PI, radius - 100])
                // const root = tree(d3.hierarchy(res.data)
                //     .sort((a, b) => d3.ascending(a.data.name, b.data.name)));
                // // console.log(root.links())
                // const svg = d3.select("svg");

                // svg.selectAll("path")
                //     .data(root.links())
                //     .join("path")
                //     .attr("fill", "none")
                //     .attr("stroke", "#555")
                //     .attr("stroke-opacity", 0.4)
                //     .attr("stroke-width", 1.5)
                //     .attr("d", d3.linkRadial()
                //         .angle(d => d.x)
                //         .radius(d => d.y));
                // this.myChart = echarts.init(document.getElementById('tree-value') as HTMLDivElement, undefined, { renderer: 'svg' });
                // const option = {
                //     tooltip: {
                //         trigger: 'item',
                //         triggerOn: 'mousemove'
                //     },
                //     series: [
                //         {
                //             type: 'tree',
                //             data: [res.data],
            
                //             top: '18%',
                //             bottom: '14%',
            
                //             layout: 'radial',
            
                //             symbol: 'emptyCircle',
            
                //             symbolSize: 4,
                //             // large: true,
                //             roam: true,
                //             initialTreeDepth: 3,
            
                //             animationDurationUpdate: 750,
            
                //             emphasis: {
                //                 focus: 'descendant'
                //             }
                //         }
                //     ]
                // };
                // this.myChart.setOption(option as EChartsResponsiveOption)

            })
    }
}
export default App;