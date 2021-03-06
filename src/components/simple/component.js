import React, { Component } from 'react';
import Title from 'components/shared/title';
import TextArea from 'components/shared/text-area';
import Button from 'components/shared/button';
import SubTitle from 'components/shared/sub-title';
import Response from 'components/shared/response';
import { getTree } from 'remote-api';
import D from 'i18n';
import VtlExample from 'utils/example';

class Simple extends Component {
  constructor() {
    super();
    this.state = { input: '', responseStatus: null, response: '' };
    this.handleChange = input => this.setState({ input, responseStatus: null, response: '' });
    this.handleClickExample = () => this.setState({ input: VtlExample });
    this.handleClick = () => {
      const { input } = this.state;
      getTree(input)
        .then(response => response.text())
        .then(response => this.setState({ response, responseStatus: 200 }));
    };
  }

  render() {
    const { input, responseStatus, response } = this.state;
    return (
      <>
        <Title label={D.simpleTitle} />
        <TextArea value={input} onChange={this.handleChange} />
        <div>
          <Button label={D.exampleBtn} onClick={this.handleClickExample} />
          <Button label={D.validationBtn} onClick={this.handleClick} />
        </div>
        {input && responseStatus === 200 && <SubTitle label={D.vtlValid} />}
        {input && response && <Response response={response} />}
      </>
    );
  }
}

export default Simple;
