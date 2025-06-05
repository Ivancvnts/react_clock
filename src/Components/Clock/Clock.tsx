import { Component } from 'react';

type Props = {
  name: string;
};

type State = {
  today: string;
};

export class Clock extends Component<Props, State> {
  state: Readonly<State> = {
    today: new Date().toUTCString().slice(-12, -4),
  };

  timerId = 0;

  updateDate = () => {
    this.setState({ today: new Date().toUTCString().slice(-12, -4) });
  };

  componentDidMount(): void {
    this.timerId = window.setInterval(this.updateDate, 1000);
  }

  componentWillUnmount(): void {
    window.clearInterval(this.timerId);
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
  ): void {
    if (this.state.today !== prevState.today) {
      // eslint-disable-next-line no-console
      console.log(this.state.today);
    }

    if (this.props.name !== prevProps.name) {
      // eslint-disable-next-line no-console
      console.warn(`Renamed from ${prevProps.name} to ${this.props.name}`);
    }
  }

  render() {
    const isPm: string =
      Number(this.state.today.substring(0, 2)) < 12 ? 'a.m.' : 'p.m.';

    return (
      <div className="Clock">
        <strong className="Clock__name">{this.props.name}</strong>
        {' time is '}
        <span className="Clock__time">{this.state.today}</span>
        <span>{isPm}</span>
      </div>
    );
  }
}
