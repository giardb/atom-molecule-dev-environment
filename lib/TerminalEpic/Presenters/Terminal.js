"use babel";
// @flow
import * as React from "react";
import ReactDOM from "react-dom";
import * as Terminal from "xterm";
import TerminalStrategy from "../../ExecutionControlEpic/LanguageServerProtocolFeature/Model/TerminalStrategy";
import FreeTerminalStrategyType from "../Presenters/Terminal"

Terminal.loadAddon("fit");

export default class FreeTerminal extends React.Component<Props, State> {
  state: State;
  props: Props;
  container: React.Element<any>;
  static defaultProps: DefaultProps;
  containerKey: number;
  prompt: string;
  strategyConf: FreeTerminalStrategyType;
  termstrat: TerminalStrategy;

  constructor(props: Props) {
    super(props);
    this.prompt = ">$ ";
    this.containerKey = 0;
  }

  initTerm() {
    if (this.props.xtermInstance != null) {
      this.props.xtermInstance.open(ReactDOM.findDOMNode(this.container));
      this.props.xtermInstance.fit();
      this.props.xtermInstance.scrollToBottom();

      this.props.xtermInstance.prompt = () => {
        this.props.xtermInstance.write("\r\n$> ");
      };

      this.props.xtermInstance.prompt();

      this.strategyConf = {
        type: "terminal",
        command: "",
        shell: "bash -c",
        cwd: "/home/giab/",
      };

      this.termstrat = new TerminalStrategy({ strategy: this.strategyConf });

      this.termstrat.on("data", ({ data }) => {
        console.log("Event on TermStrat (data) -> " + data);
        this.props.xtermInstance.write(data);
      });

      this.termstrat.on("error", ({ error }) => {
        console.log("Event on TermStrat (error) -> " + error);
        // this.props.xtermInstance.writeln(error);
      });

      this.termstrat.on("exit", ({ code }) => {
        console.log("Event on TermStrat (exit) -> " + code);
        this.termstrat.config.strategy.command = "";
        this.props.xtermInstance.prompt();
        // this.props.xtermInstance.writeln(code);
      });

      this.props.xtermInstance.textarea.onkeydown = event => {
        if (event.key == "Enter") {
          this.props.xtermInstance.write("\n");
          console.log("---> Enter");__
          // if (this.termstrat.config.strategy.command != "") {
          //   this.termstrat.run();
          // }
        } else if (event.key == "Backspace") {
          if (this.props.xtermInstance.buffer.x > 3) {
            this.termstrat.config.strategy.command = this.termstrat.config.strategy.command.slice(
              -1,
            );
            this.props.xtermInstance.write("\b \b");
          }
        } else if (event.key == "l" && event.ctrlKey) {
          this.props.xtermInstance.clear();
        } else if (event.key.length == 1) {
          this.props.xtermInstance.write(event.key);
          this.termstrat.config.strategy.command += event.key;
        }
      };
    }
  }

  componentDidMount() {
    if (this.props.xtermInstance != null) {
      this.initTerm();
      this.resizeInterval = setInterval(
        () => this.props.xtermInstance.fit(),
        1000,
      );
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.xtermInstance !== this.props.xtermInstance) {
      if (nextProps.xtermInstance == null) clearInterval(this.resizeInterval);
      this.containerKey += 1;
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.xtermInstance !== this.props.xtermInstance) {
      this.initTerm();
    }
  }

  componentWillUnmount() {
    if (this.props.xtermInstance != null) clearInterval(this.resizeInterval);
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          flex: "1 1 0",
        }}
      >
        <div
          key={this.containerKey}
          ref={elem => (this.container = elem)}
          style={{
            flex: "1",
            minWidth: "600px",
          }}
        />
      </div>
    );
  }
}

FreeTerminal.defaultProps = {};

type DefaultProps = {};

type Props = {
  xtermInstance: Terminal,
};

type State = {};
