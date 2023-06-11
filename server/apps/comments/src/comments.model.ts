import { Table, Model, Column, HasOne, DataType, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript";


interface UserCreationAttr {
    userEmail: string;
    text: string;
    date: string;
    movieid: number;
}

@Table({tableName: 'comments',createdAt: false, updatedAt: false})
export class Comment extends Model<Comment, UserCreationAttr> {

    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, allowNull: false, primaryKey: true})
    id: number

    @Column({type: DataType.INTEGER, allowNull: false})
    movieid: number;

    @Column({type: DataType.STRING, allowNull: false})
    user: string;

    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @Column({type: DataType.STRING, allowNull: false})
    date: string;

    @ForeignKey(() => Comment)
    @Column({type: DataType.INTEGER, allowNull: true})
    parentId: number;

    @BelongsTo(() => Comment, 'parentId')
    parent: Comment;

    @HasMany(() => Comment, 'parentId')
    childComments: Comment[];
}
