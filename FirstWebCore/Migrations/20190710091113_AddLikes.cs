using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FirstWebCore.Migrations
{
    public partial class AddLikes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Follower_AskUsers_userId",
                table: "Follower");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Follower",
                table: "Follower");

            migrationBuilder.RenameTable(
                name: "Follower",
                newName: "Followers");

            migrationBuilder.RenameIndex(
                name: "IX_Follower_userId",
                table: "Followers",
                newName: "IX_Followers_userId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Followers",
                table: "Followers",
                column: "id");

            migrationBuilder.CreateTable(
                name: "Likes",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    postId = table.Column<int>(nullable: false),
                    reactUserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Likes", x => x.id);
                    table.ForeignKey(
                        name: "FK_Likes_Posts_postId",
                        column: x => x.postId,
                        principalTable: "Posts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Likes_postId",
                table: "Likes",
                column: "postId");

            migrationBuilder.AddForeignKey(
                name: "FK_Followers_AskUsers_userId",
                table: "Followers",
                column: "userId",
                principalTable: "AskUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Followers_AskUsers_userId",
                table: "Followers");

            migrationBuilder.DropTable(
                name: "Likes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Followers",
                table: "Followers");

            migrationBuilder.RenameTable(
                name: "Followers",
                newName: "Follower");

            migrationBuilder.RenameIndex(
                name: "IX_Followers_userId",
                table: "Follower",
                newName: "IX_Follower_userId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Follower",
                table: "Follower",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Follower_AskUsers_userId",
                table: "Follower",
                column: "userId",
                principalTable: "AskUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
