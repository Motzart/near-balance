import React from 'react';
import { separation, toPrecision, toReadableNumber } from '~utils/numbers';
import { useSortableData } from '~hooks/useSortableData';
import styles from './content.module.scss';

type Props = {
  data: [];
};

export const Content = (props: Props) => {
  const { data } = props;

  const { items, requestSort, sortConfig } = useSortableData(data);

  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const balance = (data: any, field: any): any => {
    let total: number = 0;
    data.map((item: any) => {
      const number = toPrecision(toReadableNumber(18, item[field]), 0);
      total += Number(number);
    });

    return total;
  };

  return (
    <div className="container pt-1">
      <div className="row">
        <div className="col-md-12">
          <br />
          <br />
          {showData(items, requestSort, getClassNamesFor, balance, sortConfig)}
        </div>
      </div>
    </div>
  );
};

const showData = (
  data: any,
  requestSort: Function,
  getClassNamesFor: Function,
  balance: any,
  sortConfig: any
) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" style={{ backgroundColor: '#eaeaea' }}>
              Account Id
            </th>
            <th
              scope="col"
              onClick={() => requestSort('balance')}
              className={
                getClassNamesFor('balance') === undefined
                  ? styles.scending
                  : getClassNamesFor('balance') === 'ascending'
                  ? styles.ascending
                  : styles.descending
              }
              style={{ cursor: 'pointer', backgroundColor: 'lightgray' }}
            >
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="col"></th>
            <th scope="col">Total</th>
            <th scope="col">{separation(balance(data, 'balance'))}</th>
          </tr>
          {data.map((item, index) => {
            return (
              <tr key={item.userId + index}>
                <th scope="row">{index + 1}</th>
                <td>{item.userId}</td>
                <td>
                  {separation(
                    toPrecision(
                      toReadableNumber(18, item.balance),
                      0
                    )
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
