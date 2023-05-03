import type { Meta, StoryObj } from '@storybook/react';
import FilterPanel from './FilterPanel';
import plankStyles from './FilterPlank.module.scss';
import FilterPlank from './FilterPlank';
import FilterList from './FilterList';
import FilterRange from './FilterRange';
import FilterSearch from './FilterSearch';
import { genres, countries } from './temp/items';
import rating from '../../../public/icons/rating.svg';
import rank from '../../../public/icons/userRank.svg';

const meta: Meta<typeof FilterPanel> = {
    title: 'Filters/FilterPanel',
    component: FilterPanel,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FilterPanel>;

export const MoviesFilters: Story = {
    args: {
        children: (
            <>
                <FilterPlank title="Жанры" className={plankStyles.container__dropdown_genres}>
                    <FilterList items={genres} />
                </FilterPlank>
                <FilterPlank title="Страны" className={plankStyles.container__dropdown_countries}>
                    <FilterList items={countries} />
                </FilterPlank>
                <FilterPlank title="Рейтинг" className={plankStyles.container__dropdown_narrow}>
                    <FilterRange image={rating} limit={10} step={0.1} />
                </FilterPlank>
                <FilterPlank title="Оценки" className={plankStyles.container__dropdown_narrow}>
                    <FilterRange image={rank} limit={1000000} step={1000} />
                </FilterPlank>
                <FilterPlank title="Режиссер" className={plankStyles.container__dropdown_narrow}>
                    <FilterSearch searchBy="Режиссер" />
                </FilterPlank>
                <FilterPlank title="Актер" className={plankStyles.container__dropdown_narrow}>
                    <FilterSearch searchBy="Актер" />
                </FilterPlank>
            </>
        ),
    },
};
