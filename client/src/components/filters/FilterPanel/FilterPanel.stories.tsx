import type { Meta, StoryObj } from '@storybook/react';
import Panel from './FilterPanel';
import './FilterPanel.module.scss';
import FilterPlank from '../FilterPlank/FilterPlank';
import plankStyles from '../FilterPlank/FilterPlank.module.scss';
import FilterList from '../FilterList/FilterList';
import '../FilterList/FilterList.module.scss';
import FilterRange from '../FilterRange/FilterRange';
import '../FilterRange/FilterRange.module.scss';
import FilterSearch from '../FilterSearch/FilterSearch';
import '../FilterSearch/FilterSearch.module.scss';
import { genres, countries, actorSuggestions, directorSuggestions } from '../temp/items';
import rating from '../../../../public/icons/rating.svg';
import rank from '../../../../public/icons/userRank.svg';

const meta: Meta<typeof Panel> = {
    title: 'Filters/FilterPanel',
    component: Panel,
};

export default meta;

type Story = StoryObj<typeof Panel>;

export const FilterPanel: Story = {
    args: {
        isFilterApplied: true,
        children: (
            <>
                <FilterPlank title="Жанры" className={plankStyles.container__dropdown_leftPositioned}>
                    <FilterList category="genres" items={genres} />
                </FilterPlank>
                <FilterPlank title="Страны" className={plankStyles.container__dropdown_centerPositioned}>
                    <FilterList category="countries" items={countries} />
                </FilterPlank>
                <FilterPlank title="Рейтинг" className={plankStyles.container__dropdown_narrow}>
                    <FilterRange category="ratingKp" image={rating} limit={10} step={0.1} />
                </FilterPlank>
                <FilterPlank title="Оценки" className={plankStyles.container__dropdown_narrow}>
                    <FilterRange category="votesKp" image={rank} limit={1000000} step={1000} />
                </FilterPlank>
                <FilterPlank title="Режиссер" className={plankStyles.container__dropdown_narrow}>
                    <FilterSearch category="director" suggestionsList={directorSuggestions} />
                </FilterPlank>
                <FilterPlank title="Актер" className={plankStyles.container__dropdown_narrow}>
                    <FilterSearch category="actor" suggestionsList={actorSuggestions} />
                </FilterPlank>
            </>
        ),
    },
};
