import React from 'react';
import { render } from 'react-dom';
// CSS
import './style/css/bootstrap.min.css';
import './index.css';
// JS PERSO
import { sampleText } from './sampleText';
// MARKED.JS
import marked from 'marked';


class App extends React.Component {

	// STATE
	state = {
		text : sampleText
	};

	// LifeCycleCAllbacks

	componentWillMount(){
		const text = localStorage.getItem('text');
		if (text){
		    this.setState({ text });
		}
	}


	componentWillUpdate(nextProps, nexState){
		localStorage.setItem('text', nexState.text);
	};

	// Methods
	editText = (event) => {
		const text = event.target.value;
		this.setState({ text })

	};

	renderText = (text) => {
		const renderText = marked(text, {sanitize:true});
		return { __html: renderText };
	};

	// Render
	render(){
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-6">
						<textarea
						value={this.state.text} 
						name="" id="" 
						cols="30" 
						rows="35" 
						className="form-control"
						onChange={(e) =>  this.editText(e)}
						>
						
						</textarea>
					</div>
					<div className="col-sm-6">
						<div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
					</div>

				</div>
			</div>
			)
	}
}

render (
	<App />, document.getElementById('root')
	);
