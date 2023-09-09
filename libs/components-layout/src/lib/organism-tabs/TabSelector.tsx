import {memo, useContext} from 'react';


import {tabsContext} from './tabsContext';
import styles from './TabSelector.module.css';

import {GridArea} from '../molecules/GridArea';
import {GridTemplate} from '../molecules/GridTemplate';

const TabSelector: React.FC = memo(() => {
  const tabsData = useContext(tabsContext);

  return <span role="tablist"><GridTemplate className={styles['tabs-container']} columns={tabsData.tabs.length}>
    {tabsData.tabs?.map(({name, id}) => {
      const isSelected = id === tabsData.currentTabId;
      const tabSelectedStyles = isSelected ? styles['selected-tab'] : styles['unselected-tab'];
      const tabStyles = `${styles['tab']} ${tabSelectedStyles}`;
      return <GridArea key={id} className={tabStyles}>
        <button
          role="tab"
          aria-selected={isSelected ? 'true' : 'false'}
          aria-controls={`${id}-tab`}
          id={id}
          onClick={() => tabsData.setCurrentTabId(id)}
        >
          {name}
        </button>
      </GridArea>;
    })}
  </GridTemplate></span>;
});

TabSelector.displayName = 'TabSelector';
export {TabSelector};
