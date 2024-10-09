import React, {
  CSSProperties,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';

import sleep from 'src/tools/sleep';

import './styles.scss';

export type GetValueHandle = {
  getValue: () => Promise<number>;
};

type DiceProps = {
  ratio?: number;
};

export const Dice = forwardRef<GetValueHandle, DiceProps>(
  ({ ratio = 1 }: DiceProps, ref) => {
    const [value, setValue] = useState(1);
    const [rotated, setRotated] = useState(false);

    const toggleRotated = useCallback(() => {
      setRotated(!rotated);
    }, [rotated]);

    const delay = useMemo(() => {
      return 1500 * ratio + Math.max(2000 * (ratio - 1), 0);
    }, [ratio]);

    useImperativeHandle(
      ref,
      () => ({
        getValue: async () => {
          const value = Math.floor(Math.random() * 6) + 1;

          setValue(value);
          toggleRotated();

          await sleep(delay);

          return value;
        },
      }),
      [toggleRotated, delay],
    );

    return (
      <div
        className={`dice${rotated ? ' rotated' : ''}`}
        data-value={value}
        style={{ '--animation-ratio': ratio } as CSSProperties}>
        <div className="perspective">
          <div className="shadow" />
          <div className="z-rotator">
            <div className="rotator">
              <ol className="cube">
                <li className="dot-group dot-group-1">
                  <span className="dot dot-5" />
                </li>
                <li className="dot-group dot-group-2">
                  <span className="dot dot-1" />
                  <span className="dot dot-9" />
                </li>
                <li className="dot-group dot-group-3">
                  <span className="dot dot-1" />
                  <span className="dot dot-5" />
                  <span className="dot dot-9" />
                </li>
                <li className="dot-group dot-group-4">
                  <span className="dot dot-1" />
                  <span className="dot dot-3" />
                  <span className="dot dot-7" />
                  <span className="dot dot-9" />
                </li>
                <li className="dot-group dot-group-5">
                  <span className="dot dot-1" />
                  <span className="dot dot-3" />
                  <span className="dot dot-5" />
                  <span className="dot dot-7" />
                  <span className="dot dot-9" />
                </li>
                <li className="dot-group dot-group-6">
                  <span className="dot dot-1" />
                  <span className="dot dot-3" />
                  <span className="dot dot-4" />
                  <span className="dot dot-6" />
                  <span className="dot dot-7" />
                  <span className="dot dot-9" />
                </li>
                <li className="side side-1" />
                <li className="side side-2" />
                <li className="side side-3" />
                <li className="side side-4" />
                <li className="side side-5" />
                <li className="side side-6" />
                <li className="cross-section cross-section-z" />
                <li className="cross-section cross-section-y" />
                <li className="cross-section cross-section-x" />
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
