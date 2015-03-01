var React = require('react/addons');
var ToolPanel = require('./tool-panel');

var ToolStats = require('./tool-stats');

var ToolsPagination = require('./tools-pagination');

ToolsList = React.createClass({
	getInitialState: function () {
		return {
			tools: this.props.tools,
			tool: this.props.tools[0],
			page: 1
		};
	},
	propTypes: {
		tools: React.PropTypes.array,
		pageLength: React.PropTypes.number
	},
	setCurrentTool: function (tool) {
		this.setState({tool: tool});
	},
	handlePrev: function () {
		this.setState({page: this.state.page-1});
	},
	handleNext: function () {
		this.setState({page: this.state.page+1});
	},
	handleSkip: function (page) {
		this.setState({page: page});
	},
	render: function () {
		var createTr = function (tool) {
			return (
				<ToolPanel
					key={tool.id}
					tool={tool}
					highlight={this.state.tool == tool}
					onClick={this.setCurrentTool.bind(this, tool)}/>
			);
		}

		var pageCount = Math.ceil(this.props.tools.length/this.props.pageLength);

		return (
			<div>
				<div className="column medium-6 medium-push-6">
					<ToolPanel
						tool={this.state.tool}
						key={this.state.tool.id}
						current={true}
						onClick={this.setCurrentTool.bind(this, this.state.tool)}/>
				</div>
				<div className="column medium-pull-6 medium-6">
					<div className="panel white">
						<ToolsPagination
							prev={this.handlePrev}
							next={this.handleNext}
							skip={this.handleSkip}
							page={this.state.page}
							pageCount={pageCount}/>
						{this.props.tools.slice(
							this.props.pageLength*(this.state.page-1),
							this.props.pageLength*this.state.page
						).map(createTr, this)}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ToolsList;
